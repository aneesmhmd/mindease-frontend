import React, { useEffect, useState } from "react";
import { Button, Card, Chip, Typography } from "@material-tailwind/react";
import { adminListAppointments } from "../../../services/adminApi";

function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const TABLE_HEAD = ["User", "Date", "Slot", "Counselor", "Payment", "Status"];

  useEffect(() => {
    listAppointments();
  }, []);

  const listAppointments = async () => {
    await adminListAppointments()
      .then((res) => {
        setAppointments(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log("apps adm", err);
      });
  };
  return (
    <div>
      <Typography
        variant="h5"
        color="blue-gray"
        className="text-center mt-5 mb-3 underline underline-offset-2"
      >
        Appointments
      </Typography>
      <Card className="md:w-full">
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
            {appointments.map((appointment, index) => {
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
                      {appointment?.slot?.start}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      Dr.{appointment?.counselor?.counselor_details?.first_name}{" "}
                      {appointment?.counselor?.counselor_details?.last_name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      Rs.{appointment.amount_paid}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col items-center w-1/4">
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
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default AppointmentsList;
