import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import SelectedSlots from "./SelectedSlots";
import { toast } from "react-toastify";
import { addSlots } from "../../../services/counselorApi";
import { decodedToken } from "../../../Context/auth";
import { useNavigate } from "react-router-dom";

function AddSlots() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);
  const [timeErr, setTimeErr] = useState("");

  const navigate = useNavigate();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextDay = tomorrow.toISOString().split("T")[0];

  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const handleTimeSubmit = (e) => {
    e.preventDefault();
    setTimeErr("");
    if (time) {
      const newTime = new Date(2000, 0, 1, ...time.split(":").map(Number));

      if (!selectedTime.includes(time)) {
        const isWithin1Hour = selectedTime.some((existingTime) => {
          const existingTimeDate = new Date(
            2000,
            0,
            1,
            ...existingTime.split(":").map(Number)
          );
          const timeDifference = Math.abs(newTime - existingTimeDate);
          const millisecondsIn1Hour = 60 * 60 * 1000;
          return timeDifference <= millisecondsIn1Hour;
        });

        if (isWithin1Hour) {
          setTimeErr(
            "Selected time should be 1 hour before or after the existing slots!"
          );
        } else {
          setSelectedTime([...selectedTime, time]);
          setTime("");
        }
      } else {
        setTimeErr("The slot is already added!");
      }
    } else {
      setTimeErr("Select a slot!");
    }
  };

  const handleSubmitSlots = async () => {
    if (selectedTime.length > 0) {
      const counselor = decodedToken("counselorJwt");
      await addSlots(counselor.counselor, { selectedDate, selectedTime })
        .then((res) => {
          toast.success(res.data.message);
          navigate("/counselor/slots/");
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          navigate("/counselor/slots/");
        });
    }
  };

  return (
    <div className="pt-20 flex flex-col gap-4 min-h-screen items-center">
      <div className="flex flex-col bg-gray-100 md:w-1/2 w-3/4 items-center p-1 mt-7">
        <div className="flex flex-row items-center justify-center w-full bg-blue-gray-500 p-1">
          <Typography color="white">
            {selectedDate ? "Selected date" : "Select the date"}
          </Typography>
        </div>
        {selectedDate ? (
          <div className="flex flex-col bg-gray-100 md:w-1/2 w-3/4 items-center my-4">
            <div className="w-3/4 text-center">
              <Typography variant="small">
                {formatDate(selectedDate)}
              </Typography>
            </div>
          </div>
        ) : (
          <div className="md:w-1/2 w-3/4 text-center my-4">
            <form className="w-full">
              <Input
                label="Date"
                type="date"
                min={nextDay}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </form>
          </div>
        )}
      </div>

      {selectedDate && (
        <div className="flex flex-col bg-gray-100 animate md:w-1/2 w-3/4 items-center gap-4 p-1">
          <div className="flex flex-row items-center justify-center w-full bg-blue-gray-500 p-1">
            <Typography color="white">Selected slots</Typography>
          </div>
          <div className="w-1/2 text-center">
            <form
              className="flex flex-col gap-2 w-full"
              onSubmit={handleTimeSubmit}
            >
              <Input
                label="Date"
                type="time"
                value={time}
                min={nextDay}
                error={Boolean(timeErr)}
                onChange={(e) => setTime(e.target.value)}
              />
              <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
                {timeErr ? timeErr : ""}
              </div>
              <Button type="submit">Add Slot</Button>
              <Typography variant="small" color="blue-gray">
                NB : Each session is scheduled for 1 hour. You can only choose
                the start time
              </Typography>
            </form>
          </div>
        </div>
      )}

      {selectedTime.length > 0 && (
        <SelectedSlots
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          action={handleSubmitSlots}
        />
      )}
    </div>
  );
}

export default AddSlots;
