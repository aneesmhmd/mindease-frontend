import { PencilIcon } from '@heroicons/react/24/solid'
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
import React, { useEffect, useState } from 'react'
import { adminUpdateTaskItems } from '../../../services/adminApi';
import { toast } from 'react-toastify';

function EditTaskItem({ taskItem,getTaskItems }) {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [instructions, setInstructions] = useState('')
    const [demoUrl, setDemoUrl] = useState('')

    const handleOpen = () => setOpen((cur) => !cur)

    useEffect(()=>{
        setTitle(taskItem.title)
        setInstructions(taskItem.instructions)
        setDemoUrl(taskItem.demo_link)
    },[taskItem])

    const handleUpdateTaskItem = async (e) =>{
        e.preventDefault();

        const values = {
            'title' : title,
            'instructions' : instructions,
            'demo_link' : demoUrl 
        }

        await adminUpdateTaskItems(taskItem.id, values).then((res)=>{
            console.log('succ', res);
            toast.success('Task updated!')
            getTaskItems();
            handleOpen();
        }).catch((err)=>{
            toast.error('Error occured')
            console.log('err', err);
        })
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
                            Edit Task Activity
                        </Typography>
                    </CardHeader>
                    <form encType="multipart/form-data">
                        <CardBody className="flex flex-col gap-4">
                            <Input
                                label="Title"
                                value={title}
                                name="title"
                                size="lg"
                                onChange={(e)=> setTitle(e.target.value)}
                            />

                            <Textarea
                                value={instructions}
                                label="Instructions"
                                name="amount"
                                size="lg"
                                onChange={(e)=> setInstructions(e.target.value)}
                            />

                            <Input
                                value={demoUrl}
                                label="Demo Url"
                                size="lg"
                                onChange={(e)=> setDemoUrl(e.target.value)}
                            />



                        </CardBody>
                        <CardFooter className="pt-0 mb-3">
                            <Button
                                variant="gradient"
                                color="blue-gray"
                                fullWidth type="submit"
                                onClick={handleUpdateTaskItem}
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

export default EditTaskItem
