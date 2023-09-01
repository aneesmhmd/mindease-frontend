import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Spinner,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { decodedToken } from "../../../Context/auth";
import { removeUserImage } from "../../../services/userApi";
import { toast } from "react-toastify";

function DeleteUserImage({ setOpen, getProfileDetails }) {
  const [open, setOpenDel] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpen = () => {
    setOpenDel(!open);
    setOpen(false);
  };

  const handleRemovePhoto = () => {
    const decoded = decodedToken("userJwt");
    const id = decoded.user_id;

    setIsLoading(true);
    removeUserImage(id)
      .then((res) => {
        getProfileDetails();
        setOpenDel(!open);
        setOpen(false);
        setIsLoading(false);
        toast.success("Profile picture removed");
      })
      .catch((err) => {
        setOpenDel(!open);
        setOpen(false);
        setIsLoading(false);
        console.log("Photo remove error:", err);
        toast.error("Something went wrong.Please try again!");
      });
  };
  return (
    <div>
      <div>
        <Button onClick={handleOpen} color="red" variant="gradient">
          Remove
        </Button>
        <Dialog open={open} size="xs" handler={handleOpen}>
          <DialogHeader>Remove Profile Photo?</DialogHeader>
          <DialogBody divider>
            Are you sure to remove your profile photo? Users wouldn't be able to
            see your image.
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="gray"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="red"
              onClick={handleRemovePhoto}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spinner className="h-4 w-4 mx-auto" />
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
}

export default DeleteUserImage;
