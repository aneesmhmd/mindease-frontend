import { Avatar, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import image from "../../../images/payment-success.gif";
import { decodedToken } from "../../../Context/auth";
import { bookingPaymentSuccess, createTaskSubscription } from "../../../services/userApi";
import { useNavigate } from "react-router-dom";

function BookingSuccess() {
  const urlParams = new URLSearchParams(window.location.search);
  const appointmentId = urlParams.get("appointment");
  const [timerCompleted, setTimerCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    handlePaymentSuccess();
  }, [navigate])

  const handlePaymentSuccess = async () =>{
    await bookingPaymentSuccess(appointmentId).then((res)=>{
        console.log('dfjalkfjl;a');
    }).catch((err)=>{
        console.log('error', err);
    })
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <Helmet>
        <title>Payment Success | Appointment</title>
      </Helmet>
      <div className="flex flex-col gap-2 w-2/3 bg-white mx-auto mt-28 border rounded-xl shadow-lg items-center text-center p-6">
        <Avatar
          src={image}
          variant="rounded"
          alt="success"
          size="xxl"
          className="bg-blue-gray-50/50 "
        />
        <Typography variant="h5" color="green">
          Payment Succesfully Completed
        </Typography>

        <Typography color="blue-gray">
          Thank you for booking the slot.
        </Typography>

        <Typography color="blue-gray">
          Your payment for the appointment have been succesfully completed.You can connect <br/>
          with the Psychologists through the link which will be provided at the booked time.
        </Typography>

        <Typography color="blue-gray">
          Enjoy the session and stay connected!
        </Typography>

        <Typography variant="h6" color="red">
          Thank You!
        </Typography>
      </div>
    </div>
  );
}

export default BookingSuccess;
