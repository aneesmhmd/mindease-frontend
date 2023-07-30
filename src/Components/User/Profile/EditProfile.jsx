import React, {useEffect, useState} from "react";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    IconButton
} from "@material-tailwind/react";
import {PencilIcon} from "@heroicons/react/24/solid";
import {updateUserProfile} from "../../../Services/userApi";
import {toast} from "react-toastify";


export default function EditProfile({profile, getProfile}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);
    const [values, setValues] = useState({
        ...profile
    })

    console.log(values);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        updateUserProfile(values, profile.id).then((res) => {
            getProfile();
            toast.success('Profile updated')
        }).catch((error) => {
            toast.error('Some error occured. Please try again!')
            console.log(error);
        })
    }


    return (
        <>
            <Button onClick={handleOpen}
                className="flex items-center text-center py-0 px-2 mt-5">

                <IconButton variant="text" color="white">
                    <PencilIcon className="h-4 w-4"/>
                </IconButton>
                Edit Profile
            </Button>
            <Dialog size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none">
                <Card className="mx-auto w-full max-w-[24rem] text-center">

                    <form onSubmit={handleUpdateProfile}>

                        <CardBody className="flex flex-col gap-4">
                            <Typography className='text-lg text-black font-serif font-semibold' size='lg'>
                                Edit Profile
                            </Typography>

                            <Input label="First name" size="lg"
                                value={
                                    values.first_name
                                }
                                name="first_name"
                                onChange={
                                    (e) => setValues({
                                        ...values,
                                        [e.target.name]: e.target.value
                                    })
                                }/>

                            <Input label="Last name" size="lg"
                                value={
                                    values.last_name
                                }
                                name="last_name"
                                onChange={
                                    (e) => setValues({
                                        ...values,
                                        [e.target.name]: e.target.value
                                    })
                                }/>

                            <Input label="Email" size="lg"
                                value={
                                    values.email
                                }
                                name="email"
                                onChange={
                                    (e) => setValues({
                                        ...values,
                                        [e.target.name]: e.target.value
                                    })
                                }/>

                            <Input label="Phone Number" size="lg"
                                value={
                                    values.phone
                                }
                                name="phone"
                                onChange={
                                    (e) => setValues({
                                        ...values,
                                        [e.target.name]: e.target.value
                                    })
                                }/>

                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button variant="gradient" color="blue-gray" type="submit"
                                onClick={handleOpen}
                                fullWidth>
                                Apply Changes
                            </Button>

                        </CardFooter>
                    </form>
                </Card>
            </Dialog>
        </>
    );
}
