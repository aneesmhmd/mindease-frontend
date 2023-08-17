import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

function AddSlots() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  console.log("Tommorw", tomorrow.toISOString().split("T")[0]);
  const nextDay = tomorrow.toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState("");
  const [selectedTime, setSelectedTime] = useState([]);

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
    if (time) {
      setSelectedTime([...selectedTime, time]);
      setTime("");
      console.log("selected time", selectedTime);
    }
  };

  return (
    <div className="pt-20 flex flex-col gap-2 min-h-screen items-center">
      <div className="md:w-1/2 w-3/4 text-center mt-4 bg-dark-purple text-white rounded-t-lg py-2">
        <Typography variant="h6">Add Your Slots here</Typography>
      </div>
      <div className="flex flex-col bg-gray-100 md:w-1/2 w-3/4 items-center p-5">
        {selectedDate ? (
          <div className="flex flex-col bg-gray-100 md:w-1/2 w-3/4 items-center">
            <div className="w-3/4 text-center">
              <Typography variant="small">
                {formatDate(selectedDate)}
              </Typography>
            </div>
          </div>
        ) : (
          <div className="md:w-1/2 w-3/4 text-center">
            <Typography variant="small">Select the date</Typography>
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
        <div className="flex flex-col bg-gray-100 md:w-1/2 w-3/4 items-center p-5">
          <div className="w-1/2 text-center">
            <Typography variant="small">Select the time</Typography>
            <form className="flex flex-col gap-2" onSubmit={handleTimeSubmit}>
              <Input
                label="Date"
                type="time"
                value={time}
                min={nextDay}
                onChange={(e) => setTime(e.target.value)}
              />
              <Button type="submit">Add Slot</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddSlots;
