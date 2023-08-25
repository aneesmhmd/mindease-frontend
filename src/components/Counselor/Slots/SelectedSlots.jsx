import {
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

function SelectedSlots({ selectedTime, setSelectedTime, action }) {
  const calculatedStartTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const startTime = new Date(2000, 0, 1, hours, minutes);
    startTime.setHours(startTime.getHours());
    return startTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculatedEndTime = (startTime) => {
    const [hours, minutes] = startTime.split(":").map(Number);
    const endTime = new Date(2000, 0, 1, hours, minutes);
    endTime.setHours(endTime.getHours() + 1);
    return endTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleRemoveSlot = (index) => {
    const updatedSelectedTime = selectedTime.filter((_, i) => i !== index);
    setSelectedTime(updatedSelectedTime);
  };

  return (
    <div className="flex flex-col md:w-1/2 w-3/4 items-center gap-2">
      <div className="flex flex-col bg-gray-100 w-full items-center p-1">
        <div className="flex flex-row items-center justify-center w-full bg-blue-gray-500 p-1">
          <Typography color="white">Selected slots</Typography>
        </div>
        <div className="flex flex-row justify-around w-full border-b-2">
          <Typography>Start time</Typography>
          <Typography>End time</Typography>
          <Typography>Remove</Typography>
        </div>
        {selectedTime.map((startTime, index) => (
          <div
            key={index}
            className="flex flex-row justify-around items-center w-full"
          >
            <Typography>{calculatedStartTime(startTime)}</Typography>
            <Typography>{calculatedEndTime(startTime)}</Typography>
            <Tooltip content="Remove Slot">
              <IconButton
                onClick={() => handleRemoveSlot(index)}
                variant="text"
                color="blue-gray"
              >
                <TrashIcon className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          </div>
        ))}
      </div>
      <Button onClick={() => action()} className="w-full">
        Save Slots
      </Button>
    </div>
  );
}

export default SelectedSlots;
