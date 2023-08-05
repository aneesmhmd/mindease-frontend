import React from 'react'
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { toast } from 'react-toastify';
import { removeCounselorImage } from '../../../Services/counselorApi';
import { getLocal } from '../../../Context/auth';
import jwtDecode from 'jwt-decode';

function DeleteProfileImage({setOpen,getProfile}) {
    const [open, setOpenDel] = React.useState(false);
    const handleOpen = () => {
        setOpenDel(!open) 
        setOpen(false);
    }

    const handleRemovePhoto = () =>{
        setOpenDel(!open)
        setOpen(false)

        const token = getLocal('counselorJwt')
        const decoded = jwtDecode(token)
        const id = decoded.user_id

        removeCounselorImage(id).then((res)=>{
            toast.success('Profile picture removed')
            getProfile();
            console.log('Remove photo', res);
        }).catch((err)=>{
            console.log('Photo remove error:', err);
            toast.error('Something went wrong.Please try again!')
        })
    }

    return (
        <div>
            <Button onClick={handleOpen} color='red' variant="gradient">
                Remove
            </Button>
            <Dialog open={open} size='xs' handler={handleOpen}>
                <DialogHeader>Remove Profile Photo?</DialogHeader>
                <DialogBody divider>
                    Are you sure to remove your profile photo?
                    Users wouldn't be able to see your image.
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="gray"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        Cancel
                    </Button>
                    <Button variant="gradient" color="red" onClick={handleRemovePhoto}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>

        </div>
    )
}

export default DeleteProfileImage
