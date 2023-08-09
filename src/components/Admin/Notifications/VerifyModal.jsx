import React from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";

function VerifyModal({ handler, open, message, action }) {

    const handleConfirm = ()=>{
        action();
        handler();
    }
    return (
        <div>

            <Dialog size="xs" open={open} handler={handler}>
                <DialogHeader>Confirm {message}?</DialogHeader>
                <DialogBody divider>
                    Are you sure about the {message} of the request?You will not be able to change it later!
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
                    <Button variant="gradient" color="red" onClick={handleConfirm}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    )
}

export default VerifyModal
