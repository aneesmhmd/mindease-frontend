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
} from "@material-tailwind/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { adminAddService } from "../../../Services/adminApi";

export default function AddModal({ getServices }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')
    const handleOpen = () => setOpen((cur) => !cur);

    const handleAddService = async (e) => {
        e.preventDefault();
        if (title.trim() === '') {
            toast.error("Title couldn't be empty!")
        } else if (title.trim().length < 8 || title.trim().length > 25) {
            toast.error("Title should be 8-25 characters long!")
        } else if (description.trim() === '') {
            toast.error("Description cannot be empty!")
        } else if (description.trim().length < 15) {
            toast.warn("Description must be min 15 letters")
        } else if (!icon) {
            toast.error('Image cannot be empty')
        } else {
            const serviceFormData = new FormData();
            serviceFormData.append('title', title)
            serviceFormData.append('description', description)
            serviceFormData.append('icon', icon)

            adminAddService(serviceFormData).then((res) => {
                if (res.status === 201) {
                    getServices();
                    handleOpen()
                    toast.success('Service added succefully')
                }
            }).catch((error) => {
                toast.error(error.response.data[0])
            })
        }
    }
    return (
        <>
            <Button
                onClick={handleOpen}
                className="flex items-center gap-3" color="blue" size="sm"
            >
                <PlusCircleIcon strokeWidth={2} className="h-5 w-5" />
                Add Service</Button>

            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <CardHeader
                        variant="gradient"
                        className="mb-4 grid h-28 place-items-center bg-blue-gray-500"
                    >
                        <Typography variant="h3" color="white">
                            Add Services
                        </Typography>
                    </CardHeader>
                    <form onSubmit={handleAddService} encType="multipart/form-data">
                        <CardBody className="flex flex-col gap-4">
                            <Input
                                label="Title"
                                name="title"
                                size="lg"
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                            />

                            <Input label="Description"
                                name="description"
                                size="lg"
                                onChange={(e) => {
                                    setDescription(e.target.value)
                                }}
                            />

                            <Input
                                label="Image"
                                size="lg"
                                name="icon"
                                type="file"
                                onChange={(e) => {
                                    setIcon(e.target.files[0])
                                }}
                            />

                        </CardBody>
                        <CardFooter className="pt-0 mb-3">
                            <Button
                                variant="gradient"
                                color="blue-gray"
                                fullWidth type="submit"
                            >
                                Add Service
                            </Button>

                        </CardFooter>
                    </form>
                </Card>
            </Dialog>
        </>
    );
}