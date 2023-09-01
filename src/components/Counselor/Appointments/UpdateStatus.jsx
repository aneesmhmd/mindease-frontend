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
  Spinner,
} from "@material-tailwind/react";
import { updateAppointmentStatus } from "../../../services/counselorApi";
import { toast } from "react-toastify";

function UpdateStatus({ id, listAppointments }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [statusErr, setStatusErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (status) {
      setIsLoading(true);
      updateAppointmentStatus(id, { status })
        .then((res) => {
          setIsLoading(false);
          toast.success("Status updated!");
          listAppointments();
          handleOpen();
        })
        .catch((err) => {
          setIsLoading(false);
          handleOpen();
          toast.error("Some error occured.Please try again!");
          console.log(err);
        });
    } else {
      setStatusErr("Please select a status first!");
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
              <Select onChange={(e) => setStatus(e)} error={Boolean(statusErr)}>
                <Option value="Attended">Attended</Option>
                <Option value="Not Attended">Not attended</Option>
              </Select>
              <div className="text-red-600 -mt-4 font-mono text-[12px] lg:text-[12px] mx-auto">
                {statusErr && statusErr}
              </div>
            </CardBody>
            <CardFooter className="pt-0 mb-3">
              <Button
                variant="gradient"
                color="blue-gray"
                type="submit"
                fullWidth
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner className="h-5 w-5 mx-auto" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </>
  );
}

export default UpdateStatus;
