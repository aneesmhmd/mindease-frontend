import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { updateAppointmentStatus } from "../../../services/counselorApi";
import { toast } from "react-toastify";

function UpdateStatus({ id, listAppointments }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const handleOpen = () => setOpen((cur) => !cur);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (status) {
      updateAppointmentStatus(id, { status })
        .then((res) => {
          toast.success("Status updated!");
          listAppointments();
          handleOpen();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Button size="sm" onClick={handleOpen}>
        Update Status
      </Button>
      <Dialog
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto grid place-items-center w-full max-w-[24rem] rounded-none">
          <CardHeader
            variant="gradient"
            className="grid place-items-center m-auto bg-blue-gray-500 h-10 w-full rounded-none"
          >
            <Typography variant="h6" color="white" className="font-normal">
              Update Status
            </Typography>
          </CardHeader>
          <form onSubmit={handleUpdateStatus}>
            <CardBody className="flex flex-col gap-4 w-80">
              <Select
                onChange={(e) => {
                  setStatus(e);
                  console.log(e);
                }}
              >
                <Option value="Attended">Attended</Option>
                <Option value="Not Attended">Not attended</Option>
              </Select>
            </CardBody>
            <CardFooter className="pt-0 mb-3">
              <Button
                variant="gradient"
                color="blue-gray"
                type="submit"
                fullWidth
              >
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
}

export default UpdateStatus;
