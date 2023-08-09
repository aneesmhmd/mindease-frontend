import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Tooltip,
    IconButton,
} from "@material-tailwind/react";
import { PlusCircleIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/solid";


function DeleteTaskModal({action, taskId}) {
    const [open, setOpen] = useState(false)

    const handler = () => setOpen((cur) => (!cur))

    return (
        <div>
            <Tooltip content="Delete Task">
                <IconButton variant="text" color="blue-gray" onClick={handler}>
                    <TrashIcon className="h-4 w-4" />
                </IconButton>
            </Tooltip>

            <Dialog size="xs" open={open} handler={handler}>
                <DialogHeader>Confirm Deletion?</DialogHeader>
                <DialogBody divider>
                    Are you sure to delete the task? The task will be deleted permanently!
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handler}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button onClick={()=>action(taskId)} variant="gradient" color="red">
                        <span>Confirm Delete</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default DeleteTaskModal
