import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { BaseUrl } from "../../../constants/constants";
import axios from "axios";
import { toast } from "react-toastify";
import AvailableSlots from "../Booking/AvailableSlots";
import { useNavigate } from "react-router-dom";
import { listCounselorSlots } from "../../../services/userApi";
import RescheduleSlots from "./RescheduleSlots";

function SessionReschedule() {
  const [appointment, setAppointment] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [dateErr, setDateErr] = useState("");
  const [availSlots, setAvailSlots] = useState([]);
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(window.location.search);
  const appointmentId = urlParams.get("appointment");

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextDay = tomorrow.toISOString().split("T")[0];

  useEffect(() => {
    getAppointmentDetails();
  }, []);

  const getAppointmentDetails = async () => {
    await axios
      .get(BaseUrl + `/booking/get-appointment-details/${appointmentId}/`)
      .then((res) => {
        setAppointment(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        toast.error("Some error occured.Please try again!");
      });
  };

  const getAvailableSlots = async (e) => {
    e.preventDefault();
    setDateErr("");
    if (!selectedDate) {
      setDateErr("Please select a date first!");
      return;
    }
    await listCounselorSlots(appointment?.counselor?.id, { selectedDate })
      .then((res) => {
        setAvailSlots(res.data);
      })
      .catch((err) => {
        setAvailSlots([]);
        if (err.response.status === 404) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Some error occured!Please try again!");
          navigate("/");
        }
      });
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="flex flex-col w-full items-center mt-2">
        <Typography variant="h5" color="teal" className="underline mb-2">
          Reshcedule Your Appointment
        </Typography>
        <div className="flex flex-col items-center justify-center text-center md:w-1/2 w-3/4 rounded-xl bg-blue-50 p-4">
          <Typography variant="h6" color="teal">
            Hi user,
          </Typography>

          <Typography variant="paragraph" color="gray">
            We recognized that you were unable to attend the session.
            <br />
            As we didn't provide refund option now, you can reschedule your
            session once.
            <br />
            Please reschedule the session to a comfortable slot.
          </Typography>
        </div>

        <div className="flex flex-col w-full items-center mt-7 md:me-16">
          <div className="flex md:flex-row flex-col w-1/2 mt-2">
            <div className="flex flex-col md:w-1/2 w-full gap-3 items-center">
              <div className="flex flex-col md:mb-0 mb-4">
                <img
                  className="h-52 w-52 rounded-lg object-cover shadow-xl border-2"
                  src={appointment?.counselor?.counselor_details?.profile_image}
                  alt={appointment?.counselor?.counselor_details?.first_name}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center md:w-1/2 w-full md:gap-4 gap-2">
              <div className="flex flex-col rounded-lg shadow-md p-1 text-center bg-gray-100">
                <Typography variant="h5">
                  {" "}
                  {appointment?.counselor?.counselor_details?.first_name}{" "}
                  {appointment?.counselor?.counselor_details?.last_name}
                </Typography>
              </div>

              <div className="flex flex-col rounded-lg shadow-md p-1 text-center bg-gray-100">
                <Typography> Fee : Rs.{appointment?.counselor?.fee}</Typography>
              </div>

              <div className="flex flex-col rounded-lg shadow-md p-1 text-center bg-gray-100">
                <Typography>
                  {" "}
                  Specialization :{" "}
                  {appointment?.counselor?.specialization_details?.title}
                </Typography>
              </div>

              <div className="flex flex-col rounded-lg shadow-md p-1 text-center bg-gray-100">
                <Typography>
                  {" "}
                  State : {appointment?.counselor?.state}
                </Typography>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full items-center">
          {availSlots.length > 0 ? (
            <RescheduleSlots
              appointmentID={appointment?.id}
              counselor={appointment?.counselor?.id}
              fee={appointment?.counselor?.fee}
              date={selectedDate}
              slots={availSlots}
              setSlots={setAvailSlots}
            />
          ) : (
            <div className="flex flex-col w-1/2 mt-10">
              <form
                onSubmit={getAvailableSlots}
                className="flex flex-col md:w-1/2 w-3/4 mx-auto text-center gap-2"
              >
                <Typography color="blue-gray" className="underline">
                  Select date for booking
                </Typography>
                <Input
                  label="Date"
                  type="date"
                  min={nextDay}
                  value={selectedDate}
                  error={Boolean(dateErr)}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
                  {dateErr && dateErr}
                </div>
                <Button type="submit">See available slots</Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SessionReschedule;
