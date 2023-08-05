import React, { useEffect, useRef } from "react";
import {
    Drawer,
    Button,
} from "@material-tailwind/react";
import { decodedToken } from '../../../Context/auth'
import { updateCounselorImage } from "../../../Services/counselorApi";
import { toast } from "react-toastify";
import DeleteProfileImage from "./DeleteProfileImage";


export default function DrawerPlacement({ getProfile, profile_image }) {
    const [open, setOpen] = React.useState(true);
    const fileInputRef = useRef(null)

    const handleChangeButtonClick = () => {
        fileInputRef.current.click(); // Open the file dialog
        console.log(fileInputRef);
    };

    // Updates the image
    const handleImageUpload = (selectedImage) => {
        const pictureForm = new FormData();
        pictureForm.append("profile_image", selectedImage);

        const decoded = decodedToken('counselorJwt')
        const id = decoded.user_id

        updateCounselorImage(id, pictureForm).then((res) => {
            setOpen(!open)
            getProfile();
            toast.success('Profile Picture updated')
        }).catch((err) => {
            toast.error('Some error occured. Please try again!')
        })
    }

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
                    <h1 className="text-center text-white">Want to update your profile picture?</h1>
                    <div className="flex flex-row items-center justify-center gap-4">

                        <Button color="teal" onClick={handleChangeButtonClick}>
                            Change
                        </Button>
                        
                        {profile_image &&
                            <DeleteProfileImage setOpen={setOpen} getProfile={getProfile} />
                        }

                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={(event) => {
                            const selectedImage = event.target.files[0];
                            if (selectedImage) {
                                handleImageUpload(selectedImage)
                            }
                        }}
                    />

                </Drawer >
            </div>

        </React.Fragment>
    );
}