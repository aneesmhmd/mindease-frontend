import { Button, Drawer } from '@material-tailwind/react';
import React, { useRef } from 'react'
import { adminUpdateProfilePic } from '../../../services/adminApi';
import { decodedToken } from '../../../Context/auth';
import { toast } from 'react-toastify';

function AdminProfilePic({ getProfile, profile_image }) {
    const [open, setOpen] = React.useState(true);
    const fileInputRef = useRef(null)

    const handleChangeButtonClick = () => {
        fileInputRef.current.click(); // Open the file dialog
        console.log(fileInputRef);
    };

    const handleImageUpload = (selectedImage) => {
        const pictureForm = new FormData();
        pictureForm.append("profile_image", selectedImage);

        const decoded = decodedToken('adminJwt')
        const id = decoded.user_id

        adminUpdateProfilePic(id, pictureForm).then((res) => {
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
    )
}

export default AdminProfilePic
