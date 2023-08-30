import {
  Button,
  Option,
  Select,
  Spinner,
  Typography,
  dialog,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { decodedToken } from "../../../Context/auth";
import { sessionReschedule } from "../../../services/userApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function RescheduleSlots({ appointmentID,counselor, fee, date, slots, setSlots }) {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [slotErr, setSlotErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const formatedDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
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

  const handleSessionReschedule = async (e) => {
    e.preventDefault();

    if (selectedSlot) {
      const token = decodedToken("userJwt");
      const user = token.user_id;
      const values = {
        user: user,
        counselor: counselor,
        date: date,
        slot: selectedSlot,
        amount: fee,
      };

      await sessionReschedule(appointmentID, values).then((res)=>{
        toast.success(res.data.message)
        navigate('/')
      }).catch((err)=>{
        toast.error(err.response.data.message)
        navigate('/')
      })
    } else {
      setLoading(false);
      setSlotErr("Please select a slot first!");
    }
  };

  return (
    <div className="flex flex-col w-1/3 mt-10 items-center gap-3">
      <form
        className="flex flex-col md:w-2/3 w-full gap-2"
        onSubmit={handleSessionReschedule}
      >
        <div className="flex flex-col bg-gray-100 w-full text-center py-2 shadow-md rounded-lg">
          <Typography variant="h6"> {formatedDate(date)}</Typography>
        </div>
        <Select
          label="Select Slot"
          onChange={(e) => setSelectedSlot(e)}
          error={Boolean(slotErr)}
        >
          {slots &&
            slots.map((slot, index) => (
              <Option key={index} value={slot.id}>
                {formatedTime(slot?.start)} - {formatedTime(slot?.end)}
              </Option>
            ))}
        </Select>
        <div className="text-red-600 text-center font-mono text-[12px] lg:text-[12px]">
          {slotErr && slotErr}
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <Spinner className="h-5 w-5 mx-auto" />
          ) : (
            "Proceed to Payment"
          )}
        </Button>
      </form>
    </div>
  );
}

export default RescheduleSlots;
