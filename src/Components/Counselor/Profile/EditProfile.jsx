import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
} from "@material-tailwind/react";
import { toast } from "react-toastify";

export default function EditProfile({ profile, updateProfile }) {
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        setFirstName(profile.first_name);
        setLastName(profile.last_name);
        setEmail(profile.email);
        setPhone(profile.phone);
    }, [profile]);


    const handleOpen = () => setOpen((cur) => !cur);

    const handleEditProfile = async (e) => {
        e.preventDefault();

        // Regex patterns for validation
        const firstNameRegex = /^[a-zA-Z]{4,}$/;
        const lastNameRegex = /^[a-zA-Z]$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10,12}$/;

        // Validate the inputs
        if (!firstName || !firstNameRegex.test(firstName)) {
            toast.error("First name must be at least four characters long and contain only letters");
        } else if (lastName && !lastNameRegex.test(lastName)) {
            toast.error("Last name should contain only letters");
        } else if (!email || !emailRegex.test(email)) {
            toast.error("Invalid email");
        } else if (!phone || !phoneRegex.test(phone)) {
            toast.error("Invalid phone number");
        } else {
            const updatedProfile = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone: phone
            }

            updateProfile(updatedProfile);
            handleOpen();
            console.log('updated profile', updatedProfile);
        }



    }
    return (
        <>

            <button
                className='bg-gray-900 md:w-36 w-1/2 rounded text-sm mt-2 mb-4 text-white'
                onClick={handleOpen}
            >
                Edit Profile
            </button>

            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto grid place-items-center w-full max-w-[24rem] rounded-none" >
                    <CardHeader
                        variant="gradient"
                        className="grid place-items-center m-auto bg-blue-gray-500 h-12 w-full rounded-none"
                    >
                        <Typography variant="h5" color="white" className='font-normal font-pacifico'>
                            Edit Profile
                        </Typography>
                    </CardHeader>
                    <form onSubmit={handleEditProfile}>
                        <CardBody className="flex flex-col gap-4 w-80">

                            <Input
                                value={firstName}
                                label="First name"
                                name="firstName"
                                size="lg"
                                onChange={(e) => { setFirstName(e.target.value) }}
                            />

                            <Input label="Last name"
                                value={lastName}
                                name="lastName"
                                size="lg"
                                onChange={(e) => { setLastName(e.target.value) }}
                            />

                            <Input label="Email"
                                name="email"
                                value={email}
                                className="w-1/2"
                                size="lg"
                                onChange={(e) => { setEmail(e.target.value) }}
                            />

                            <Input label="Phone"
                                name="phone"
                                value={phone}
                                size="lg"
                                onChange={(e) => { setPhone(e.target.value) }}
                            />

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