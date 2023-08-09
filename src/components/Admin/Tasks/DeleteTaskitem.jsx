import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Tooltip } from '@material-tailwind/react'
import { TrashIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { adminDeleteTaskItems } from '../../../services/adminApi'
import { toast } from 'react-toastify'

function DeleteTaskitem({ taskId, getTaskItems }) {
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen((cur) => !cur)

    const handleDeleteItem = async (e) => {
        e.preventDefault();
        await adminDeleteTaskItems(taskId).then((res) => {
            toast.success('Task deleted')
            getTaskItems();
            handleOpen();
        }).catch((err) => {
            toast.error('Something went wrong')
        })
    }


    return (
        <div>
            <Tooltip content="Delete Task">
                <IconButton variant="text" color="blue-gray" onClick={handleOpen}>
                    <TrashIcon className="h-4 w-4" />
                </IconButton>
            </Tooltip>

            <Dialog size="xs" open={open} handler={handleOpen}>
                <DialogHeader>Confirm Deletion?</DialogHeader>
                <DialogBody divider>
                    Are you sure to delete the task? The task will be deleted permanently!
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="red" onClick={handleDeleteItem}>
                        <span>Confirm Delete</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default DeleteTaskitem
