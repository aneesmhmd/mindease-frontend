import { Button, Input, Spinner, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SlotsTable from "./SlotsTable";
import { listSlots } from "../../../services/counselorApi";
import { decodedToken } from "../../../Context/auth";
import NotAvailable from "./NotAvailable";

function SlotsPage() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [dateErr, setDateErr] = useState("");
  const currentDate = new Date().toISOString().split("T")[0];
  const [slots, setSlots] = useState([]);
  const [notAvailable, setNotAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleSlotsSubmit = async (e) => {
    e.preventDefault();
    setDateErr("");
    if (selectedDate) {
      setIsLoading(true)
      const counselor = decodedToken("counselorJwt");
      const id = counselor.counselor;
      await listSlots(id, { selectedDate })
        .then((res) => {
          setNotAvailable(false);
          setSlots(res.data);
          setIsLoading(false)
        })
        .catch((err) => {
          setIsLoading(false)
          setSlots([]);
          setNotAvailable(true);
        });
    } else {
      setDateErr("Please select a date first!");
    }
  };

  return (
    <div className="flex flex-col items-center pt-20 min-h-screen bg-gray-100">
      <div className="flex flex-col w-3/4 items-center gap-3 mt-6">
        <div className="flex flex-col w-2/3 items-end">
          <Link to="add-slots/">
            <Button>Add New Slot</Button>
          </Link>
        </div>
        <div className="flex flex-col md:w-2/3 w-full bg-blue-gray-500 h-10 justify-center">
          <Typography color="white" variant="h6" className="text-center">
            Your Slots
          </Typography>
        </div>

        <div className="flex flex-col md:w-2/3 w-full bg-white text-center items-center gap-3 p-3">
          <Typography variant="small">
            Select the date to view your slots
          </Typography>
          <form
            onSubmit={handleSlotsSubmit}
            className="flex flex-col gap-3 md:w-2/3 w-full md:px-0 px-1 mb-3"
          >
            <div className="flex md:flex-row flex-col items-center gap-3 w-full">
              <Input
                label="Select the date"
                type="date"
                min={currentDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                error={Boolean(dateErr)}
              />
              <Button className="w-40" type="submit" disabled={isLoading}>
                  {isLoading ? <Spinner className="h-4 w-5 mx-auto" /> : "View Slots"}
              </Button>
            </div>
            <div className="text-red-600 font-mono text-[12px] lg:text-[12px] md:me-28 text-center">
              {dateErr ? dateErr : ""}
            </div>
          </form>
        </div>

        {slots.length > 0 && <SlotsTable slots={slots} />}
        {notAvailable && slots.length === 0 && <NotAvailable />}
      </div>
    </div>
  );
}

export default SlotsPage;
