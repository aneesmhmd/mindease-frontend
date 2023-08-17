import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SlotsTable() {
  const [selectedDate, setSelectedDate] = useState(null);
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    console.log("selected date", selectedDate);
  }, [selectedDate]);
  return (
    <div className="flex flex-col items-center pt-20 min-h-screen">
      <div className="flex flex-col w-3/4 items-center gap-3 mt-20">
        <div className="flex flex-col md:w-2/3 w-full bg-dark-purple h-10 justify-center">
          <Typography color="white" variant="h6" className="text-center">
            Your Slots
          </Typography>
        </div>

        <div className="flex flex-col md:w-2/3 w-full bg-gray-100 text-center items-center gap-3 p-3">
          <Typography variant="small">
            Select the date to view your slots
          </Typography>
          <form className="flex flex-row gap-3 md:w-2/3 w-full md:px-0 px-1">
            <Input
              label="Select the date"
              type="date"
              min={currentDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <Button className="w-40">
              View Slots
            </Button>
          </form>
          <Link to='add-slots/'>
            <Button>Add New Slot</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SlotsTable;
