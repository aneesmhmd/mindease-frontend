import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
} from "@material-tailwind/react";

function CertificateView({open, handler, certificate}) {
  return (
    <div>
      <Dialog size="lg" open={open} handler={handler}>
        
        <DialogBody divider={true} className="p-0">
          <img
            alt="nature"
            className="w-full object-cover object-center"
            src={certificate}
          />
        </DialogBody>
      </Dialog>
    </div>
  )
}

export default CertificateView
