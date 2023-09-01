import React, { useEffect, useState } from "react";
import { getUserAppointments } from "../../../../services/userApi";
import { decodedToken } from "../../../../Context/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button, Chip, Typography } from "@material-tailwind/react";

function UserAppointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listAppointments();
  }, [navigate]);

  const listAppointments = async () => {
    const decoded = decodedToken("userJwt");
    if (decoded) {
      getUserAppointments(decoded.user_id)
        .then((res) => {
          setAppointments(res.data);
          console.log("appoint", res.data);
        })
        .catch((err) => {
          console.log("app err", err);
          setAppointments([]);
        });
    } else {
      navigate("/login");
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

  return (
    <div className="w-full">
      {appointments.length > 0 ? (
        <div className="flex flex-col gap-5 h-24 justify-center my-3">
          {appointments.map((appointment, index) => (
            <div
              key={index}
              className="flex flex-row justify-around text-center text-black"
            >
              <Typography className="flex flex-col justify-center w-1/4">
                {appointment?.session_date}
              </Typography>
              <Typography className="flex flex-col justify-center w-1/4">
                {formatedTime(appointment?.slot?.start)} -{" "}
                {formatedTime(appointment?.slot?.end)}
              </Typography>
              <Typography className="flex flex-col justify-center w-1/4">
                Dr.{appointment?.counselor?.counselor_details?.first_name}{" "}
                {appointment?.counselor?.counselor_details?.last_name}
              </Typography>

              <div className="flex flex-col items-center justify-center w-1/4 gap-1">
                <Chip
                  className="text-center"
                  value={appointment.status}
                  variant="ghost"
                  size="sm"
                  color={
                    appointment.status === "Attended"
                      ? "green"
                      : appointment.status === "Pending"
                      ? "orange"
                      : "red"
                  }
                />

                {appointment.status === "Not attended" && !appointment.is_rescheduled && (
                  <Link
                    to={`/session-reschedule/?appointment=${appointment.id}`}
                  >
                    <Button size="sm">Reschedule</Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center h-16">
          <Typography variant="h6" className="text-center">
            You haven't taken any appointments yet!
          </Typography>
        </div>
      )}
    </div>
  );
}

export default UserAppointments;
