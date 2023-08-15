import { Avatar, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import image from "../../../images/tick.gif";
import { decodedToken } from "../../../Context/auth";
import { createTaskSubscription } from "../../../services/userApi";
import { useNavigate } from "react-router-dom";

function PaymentSuccess() {
  const urlParams = new URLSearchParams(window.location.search);
  const task = urlParams.get("task");
  const amount = urlParams.get("amount_paid");
  const [timerCompleted, setTimerCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = decodedToken("userJwt");
    const user = token.user_id;

    const values = {
      user: user,
      task: task,
      amount_paid: amount,
    };
    createSubscription(values);

    const timeout = setTimeout(() => {
      setTimerCompleted(true);
      navigate("/");
    }, 5000);
    return () => clearTimeout(timeout);
  }, [task, navigate]);

  const createSubscription = async (values) => {
    await createTaskSubscription(values)
      .then((res) => {
        console.log("Success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <Helmet>
        <title>Payment Success | Subscription</title>
      </Helmet>
      <div className="flex flex-col gap-2 w-2/3 bg-white mx-auto mt-28 border rounded-xl shadow-lg items-center text-center p-6">
        <Avatar
          src={image}
          variant="rounded"
          alt="success"
          size="xxl"
          className="bg-blue-gray-50/50 object-contain"
        />
        <Typography variant="h5" color="green">
          Payment Succesfully Completed
        </Typography>

        <Typography color="blue-gray">
          Your payment for the task have been succesfully completed and the task
          will be unlocked very soon.
        </Typography>

        <Typography color="blue-gray">
          Thank you for subscribing the task. Now you can start doing the task
          by visiting subscriptions in your profile section.
        </Typography>

        <Typography color="blue-gray">
          Enjoy the activities and stay connected!
        </Typography>

        <Typography variant="h6" color="red">
          Thank You!
        </Typography>
      </div>
    </div>
  );
}

export default PaymentSuccess;
