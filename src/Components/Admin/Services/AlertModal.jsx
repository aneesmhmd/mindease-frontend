import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";



export default function AlertModal({ message, confirm, serviceId, action }) {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(!open);


    return (
        <>
            <Tooltip content="Delete Service">
                <IconButton onClick={handleOpen} variant="text" color="blue-gray">
                    <TrashIcon className="h-4 w-4" />
                </IconButton>
            </Tooltip>

            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0.9, y: -100 },
                }}
            >
                <DialogHeader>Confirm {confirm}?</DialogHeader>
                <DialogBody divider>
                    {message}
                </DialogBody >
                <DialogFooter>
                    <Button
                        variant="text"
                        color="blue-gray"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={() => { action({ serviceId }.serviceId), handleOpen() }}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}