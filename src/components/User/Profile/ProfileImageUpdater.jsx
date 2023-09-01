import React, { useEffect, useRef, useState } from "react";
import { Drawer, Button, Spinner } from "@material-tailwind/react";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import DeleteUserImage from "./DeleteUserImage";
import { updateUserImage } from "../../../services/userApi";
import { decodedToken } from "../../../Context/auth";

function ProfileImageUpdater({ getProfileDetails, profile_image }) {
  const [open, setOpen] = React.useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChangeButtonClick = () => {
    fileInputRef.current.click(); // Open the file dialog
  };

  // Updates the image
  const handleImageUpload = (selectedImage) => {
    const pictureForm = new FormData();
    pictureForm.append("profile_image", selectedImage);

    const decoded = decodedToken("userJwt");
    const id = decoded.user_id;
    setIsLoading(true);
    updateUserImage(id, pictureForm)
      .then((res) => {
        getProfileDetails();
        setOpen(!open);
        setIsLoading(false);
        toast.success("Profile Picture updated");
      })
      .catch((err) => {
        setIsLoading(false);
        setOpen(!open);
        toast.error("Some error occured. Please try again!");
        console.log("user image updatge error:", err);
      });
  };

  return (
    <React.Fragment>
      <div className="flex justify-center">
        <Drawer
          placement="bottom"
          open={open}
          onClose={() => setOpen(false)}
          className="mx-auto p-4 bg-opacity-50 bg-gray-300"
          size={90}
        >
          <h1 className="text-center text-white">
            Want to update your profile picture?
          </h1>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button
              color="teal"
              onClick={handleChangeButtonClick}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex flex-row w-full gap-1">
                    <span>Updating</span>
                  <Spinner className="h-4 w-4 mx-auto" />
                </div>
              ) : (
                "Change"
              )}
            </Button>
            {profile_image && (
              <DeleteUserImage
                setOpen={setOpen}
                getProfileDetails={getProfileDetails}
              />
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={(event) => {
              const selectedImage = event.target.files[0];
              if (selectedImage) {
                handleImageUpload(selectedImage);
              }
            }}
          />
        </Drawer>
      </div>
    </React.Fragment>
  );
}

export default ProfileImageUpdater;
