import { IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

function SlotsTable({ slots }) {
  return (
    <div className="flex flex-col md:w-2/3 w-full bg-white text-center items-center gap-3 p-3">
      <div className="flex flex-row items-center justify-center w-full bg-blue-gray-500 p-1">
        <Typography color="white">Selected slots</Typography>
      </div>
      <div className="flex flex-row justify-around w-full border-b-2">
        <Typography>Start time</Typography>
        <Typography>End time</Typography>
        <Typography>Remove</Typography>
      </div>
      {slots.map((slot, index) => (
        <div key={index} className="flex flex-row justify-around items-center w-full">
          <Typography>{slot.start}</Typography>
          <Typography>{slot.end}</Typography>
          <Tooltip content="Remove Slot">
            <IconButton variant="text" color="blue-gray">
              <TrashIcon className="h-4 w-4" />
            </IconButton>
          </Tooltip>
        </div>
      ))}
    </div>
  );
}

export default SlotsTable;
