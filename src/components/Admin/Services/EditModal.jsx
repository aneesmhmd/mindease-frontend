import React, { useState, useEffect } from "react";
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Tooltip,
    IconButton,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import {  adminUpdateService } from "../../../services/adminApi";
import { AdminUrl } from "../../../constants/constants";
import axios from "axios";

export default function AddModal({ service, getServices }) {
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(service.title)
    const [description, setDescription] = useState(service.description)
    const [icon, setIcon] = useState(service.icon)
    const [isIconChanged, setIsIconChanged] = useState(false)
    const handleOpen = () => setOpen((cur) => !cur);


    useEffect(() => {
        console.log('This is values:', icon);
    }, [title])

    const handleImageChange = (e) =>{
        setIcon(e.target.files[0])
        setIsIconChanged(true)
    }

    const handleUpdateService = async (e) => {
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
            {isIconChanged&&
                serviceFormData.append('icon', icon)
                setIsIconChanged(false)
            }

            adminUpdateService(service.id,serviceFormData).then((res) => {
                if (res.status === 200) {
                    getServices();
                    handleOpen()
                    toast.success('Service updated succefully')
                }
            }).catch((error) => {
                console.log('This is the service error :', error);
                toast.error(error.response.data.icon[0])
            })
        }
    }
    return (
        <>

            <Tooltip content="Edit Service">
                <IconButton variant="text" color="blue-gray" onClick={handleOpen}>
                    <PencilIcon className="h-4 w-4" />
                </IconButton>
            </Tooltip>
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
                            Edit Service
                        </Typography>
                    </CardHeader>
                    <form onSubmit={handleUpdateService} encType="multipart/form-data">
                        <CardBody className="flex flex-col gap-4">
                            <Input
                                value={title}
                                label="Title"
                                name="title"
                                size="lg"
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                            />

                            <Input
                                value={description}
                                label="Description"
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
                                onChange={handleImageChange}
                            />

                        </CardBody>
                        <CardFooter className="pt-0 mb-3">
                            <Button
                                variant="gradient"
                                color="blue-gray"
                                fullWidth type="submit"
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