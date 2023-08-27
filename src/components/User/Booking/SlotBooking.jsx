import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import {
  getCounselorProfile,
  listCounselorSlots,
} from "../../../services/userApi";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AvailableSlots from "./AvailableSlots";
import axios from "axios";
import { BaseUrl } from "../../../constants/constants";

function SlotBooking() {
  const urlParams = new URLSearchParams(window.location.search);
  const counselorId = urlParams.get("psychologist");
  const [profile, setProfile] = useState({});
  const [selectedDate, setSelectedDate] = useState("");
  const [dateErr, setDateErr] = useState("");
  const [availSlots, setAvailSlots] = useState([]);
  const navigate = useNavigate();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextDay = tomorrow.toISOString().split("T")[0];

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    await axios.get(BaseUrl + `/user/get-counselor-profile/${counselorId}/`)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        navigate("/psychologists");
        toast.error("Some error occured!Please try again!");
        console.log("Err", err);
      });
  };

  const getAvailableSlots = async (e) => {
    e.preventDefault();
    setDateErr("");
    if (!selectedDate) {
      setDateErr("Please select a date first!");
      return;
    }
    await listCounselorSlots(counselorId, { selectedDate })
      .then((res) => {
        setAvailSlots(res.data);
      })
      .catch((err) => {
        setAvailSlots([]);
        if (err.response.status === 404) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Some error occured!Please try again!");
        }
      });
  };

  return (
    <div className="pt-20 min-h-screen">
      <Helmet>
        <title>Book Slot | MindEase</title>
      </Helmet>
      <div className="flex flex-col w-full items-center mt-7">
        <Typography variant="h5" className="underline">
          Book Your Slot
        </Typography>
        <div className="flex md:flex-row flex-col w-1/2 mt-10">
          <div className="flex flex-col md:w-1/2 w-full gap-3 items-center">
            <div className="flex flex-col md:mb-0 mb-4">
              <img
                className="h-52 w-52 rounded-lg object-cover shadow-xl border-2"
                src={profile?.counselor_details?.profile_image}
                alt={profile?.counselor_details?.first_name}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center md:w-1/2 w-full md:gap-4 gap-2">
            <div className="flex flex-col rounded-lg shadow-md p-1 text-center bg-gray-100">
              <Typography variant="h5">
                {" "}
                {profile?.counselor_details?.first_name}{" "}
                {profile?.counselor_details?.last_name}
              </Typography>
            </div>

            <div className="flex flex-col rounded-lg shadow-md p-1 text-center bg-gray-100">
              <Typography> Fee : Rs.{profile.fee}</Typography>
            </div>

            <div className="flex flex-col rounded-lg shadow-md p-1 text-center bg-gray-100">
              <Typography>
                {" "}
                Specialization : {profile?.specialization_details?.title}
              </Typography>
            </div>

            <div className="flex flex-col rounded-lg shadow-md p-1 text-center bg-gray-100">
              <Typography> State : {profile?.state}</Typography>
            </div>
          </div>
        </div>

        {availSlots.length > 0 ? (
          <AvailableSlots
            counselor={counselorId}
            fee={profile?.fee}
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
  );
}

export default SlotBooking;
