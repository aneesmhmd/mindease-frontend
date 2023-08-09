import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React from 'react'
import { decodedToken } from '../../../Context/auth';
import { removeUserImage } from '../../../services/userApi';
import { toast } from 'react-toastify';

function DeleteUserImage({ setOpen, getProfileDetails }) {
    const [open, setOpenDel] = React.useState(false);
    const handleOpen = () => {
        setOpenDel(!open)
        setOpen(false);
    }

    const handleRemovePhoto = () =>{
        setOpenDel(!open)
        setOpen(false)

        const decoded = decodedToken('userJwt')
        const id = decoded.user_id

        removeUserImage(id).then((res)=>{
            toast.success('Profile picture removed')
            getProfileDetails();
            console.log('Remove photo', res);
        }).catch((err)=>{
            console.log('Photo remove error:', err);
            toast.error('Something went wrong.Please try again!')
        })
    }
    return (
        <div>
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
                            <span>Cancel</span>
                        </Button>
                        <Button variant="gradient" color="red" onClick={handleRemovePhoto}>
                            <span>Confirm</span>
                        </Button>
                    </DialogFooter>
                </Dialog>

            </div>
        </div>
    )
}

export default DeleteUserImage
