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
    Textarea,
} from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

function EditTaskModal({ task, action }) {
    const [tasks, setTask] = useState({})
    const [open, setOpen] = useState(false);
    const [isImageChanged, setIsImageChanged] = useState(false);

    const handleOpen = () => setOpen((cur) => !cur);

    useEffect(() => {
        setTask(task)
    }, [task])

    const handleImageChange = (e) => {
        setTask({ ...tasks, image: e.target.files[0] });
        setIsImageChanged(true);
    };

    const handleSumbit = async (e) => {
        e.preventDefault();
        const updatedData = new FormData()
        updatedData.append('title', tasks.title)
        updatedData.append('validity', tasks.validity)
        updatedData.append('amount', tasks.amount)
        updatedData.append('description', tasks.description)
        
        {isImageChanged &&
            updatedData.append('image', tasks.image)
            setIsImageChanged(false)
        }

        await action(tasks.id, updatedData)
        handleOpen();
    }


    return (
        <div>
            <Tooltip content="Edit Task">
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
                <Card className="mx-auto w-full max-w-[24rem] rounded">
                    <CardHeader
                        variant="gradient"
                        className="mb-4 grid h-20 place-items-center bg-blue-gray-500 rounded"
                    >
                        <Typography variant="h3" color="white">
                            Edit Task
                        </Typography>
                    </CardHeader>
                    <form encType="multipart/form-data">
                        <CardBody className="flex flex-col gap-4">
                            <Input
                                label="Title"
                                name="title"
                                size="lg"
                                value={tasks.title}
                                onChange={(e) => setTask({ ...tasks, [e.target.name]: e.target.value })}
                            />

                            <Input
                                label="Subscription Amount"
                                name="amount"
                                size="lg"
                                value={tasks.amount}
                                onChange={(e) => setTask({ ...tasks, [e.target.name]: e.target.value })}

                            />

                            <Input
                                label="Validity"
                                name="validity"
                                size="lg"
                                value={tasks.validity}
                                onChange={(e) => setTask({ ...tasks, [e.target.name]: e.target.value })}

                            />

                            <Textarea
                                label="Description"
                                name="description"
                                size="lg"
                                value={tasks.description}
                                onChange={(e) => setTask({ ...tasks, [e.target.name]: e.target.value })}

                            />

                            <Input
                                label="Image"
                                size="lg"
                                name="image"
                                type="file"
                                onChange={handleImageChange}
                            />

                        </CardBody>
                        <CardFooter className="pt-0 mb-3">
                            <Button
                                variant="gradient"
                                color="blue-gray"
                                fullWidth type="submit"
                                onClick={handleSumbit}
                            >
                                Save Changes
                            </Button>

                        </CardFooter>
                    </form>
                </Card>
            </Dialog>
        </div>
    )
}

export default EditTaskModal
