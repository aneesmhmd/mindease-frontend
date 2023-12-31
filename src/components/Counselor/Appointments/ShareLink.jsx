import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Spinner,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
import { shareMeetLink } from "../../../services/counselorApi";

function ShareLink({ id, user }) {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState("");
  const [linkErr, setLinkErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const handleShareLink = async (e) => {
    e.preventDefault();
    setLinkErr("");
    const values = {
      appointment: id,
      user: user,
      link: link,
    };
    if (link) {
      setIsLoading(true);
      shareMeetLink(values)
        .then((res) => {
          setIsLoading(false);
          toast.success("Link shared!");
          handleOpen();
        })
        .catch((err) => {
          setIsLoading(false);
          handleOpen();
          console.log("err", err);
          if (err.response.data.link) {
            toast.error(err.response.data.link[0]);
          } else {
            toast.error("Some error occured!Please try again");
          }
        });
    } else {
      setLinkErr("Please enter the link");
    }
  };

  return (
    <>
      <Button size="sm" onClick={handleOpen}>
        Share Link
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
              Share Link for Meet
            </Typography>
          </CardHeader>
          <form onSubmit={handleShareLink}>
            <CardBody className="flex flex-col gap-4 w-80">
              <Input
                label="Paste URL here"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                error={Boolean(linkErr)}
              />
              <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
                {linkErr && linkErr}
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

export default ShareLink;
