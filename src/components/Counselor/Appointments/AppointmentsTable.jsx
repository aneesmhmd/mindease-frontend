import React, { useEffect, useState } from "react";
import { Button, Card, Chip, Typography } from "@material-tailwind/react";
import { listAllAppointments } from "../../../services/counselorApi";
import { decodedToken } from "../../../Context/auth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import UpdateStatus from "./UpdateStatus";
import ShareLink from "./ShareLink";

function AppointmentsTable() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const TABLE_HEAD = ["User", "Date", "Slot", "Status", "Action", "Link"];

  useEffect(() => {
    listAppointments();
  }, []);

  const listAppointments = async () => {
    const decoded = decodedToken("counselorJwt");
    if (decoded) {
      listAllAppointments(decoded.counselor)
        .then((res) => {
          setAppointments(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log("apps counse", err);
        });
    } else {
      toast.info("Please login first!");
      navigate("/counselor/login");
    }
  };

  const chekChange = (time) => {
    const currentDate = new Date();
    const [hours, minutes] = time.split(":").map(Number);

    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();

    const endTimeInSeconds = hours * 3600 + minutes * 60;
    const currentTimeInSeconds = currentHours * 3600 + currentMinutes * 60;

    if (endTimeInSeconds < currentTimeInSeconds) {
      return true;
    } else {
      return false;
    }
  };

  const formatedTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const startTime = new Date(2000, 0, 1, hours, minutes);
    startTime.setHours(startTime.getHours());
    return startTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCreateMeet = () => {
    window.open("https://meet.google.com/");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row w-3/4 justify-between items-center">
        <Typography
          variant="h5"
          color="blue-gray"
          className="text-center mt-5 mb-3 underline underline-offset-2"
        >
          Today's Appointments
        </Typography>
        <div>
          <Button size="sm" color="teal" onClick={() => handleCreateMeet()}>
            Create meet
          </Button>
        </div>
      </div>
      <Card className="md:w-3/4">
        <table className="w-full table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-500 p-4"
                >
                  <Typography
                    variant="small"
                    color="white"
                    className="font-normal leading-none"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 &&
              appointments.map((appointment, index) => {
                const isLast = index === appointments.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={index}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {appointment?.user?.first_name}{" "}
                        {appointment?.user?.last_name}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {appointment.session_date}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {formatedTime(appointment?.slot?.start)} -{" "}
                        {formatedTime(appointment?.slot?.end)}
                      </Typography>
                    </td>

                    <td className={classes}>
                      <div className="flex">
                        <Chip
                          size="sm"
                          variant="ghost"
                          value={appointment.status}
                          color={
                            appointment.status === "Attended"
                              ? "green"
                              : appointment.status === "Pending"
                              ? "orange"
                              : "red"
                          }
                          className="text-center"
                        />
                      </div>
                    </td>

                    <td className={classes}>
                      <h1>
                        {chekChange(appointment?.slot?.end) &&
                        appointment.status === "Pending" ? (
                          <UpdateStatus
                            id={appointment.id}
                            listAppointments={listAppointments}
                          />
                        ) : (
                          "N/A"
                        )}
                      </h1>
                    </td>

                    <td className={classes}>
                      <h1>
                        {!chekChange(appointment?.slot?.end) &&
                        appointment.status === "Pending" ? (
                          <ShareLink
                            id={appointment.id}
                            user={appointment?.user?.id}
                          />
                        ) : (
                          "N/A"
                        )}
                      </h1>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        {appointments.length === 0 && (
          <div className="flex flex-col items-center justify-center h-20">
            <Typography color="black">No appointments today</Typography>
          </div>
        )}
      </Card>
    </div>
  );
}

export default AppointmentsTable;
