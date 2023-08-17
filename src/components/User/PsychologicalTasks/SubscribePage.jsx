import React, { useEffect, useState } from "react";
import image from "../../../images/subBg.jpg";
import { Helmet } from "react-helmet";
import { Button, Checkbox, Typography } from "@material-tailwind/react";
import {
  createCheckoutSession,
  getPsychologicalTaskDetails,
} from "../../../services/userApi";
import { toast } from "react-toastify";
import { decodedToken } from "../../../Context/auth";
import Loaders from "../../Loaders";
import { useNavigate } from "react-router-dom";

function SubscribePage() {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({});
  const [checked, setChecked] = useState(false);
  const [checkErr, setCheckErr] = useState("");

  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const taskId = urlParams.get("task");

  useEffect(() => {
    getTaskDetails();
  }, []);

  const getTaskDetails = async () => {
    await getPsychologicalTaskDetails(taskId)
      .then((res) => {
        setTask(res.data);
      })
      .catch((err) => {
        console.log("Details get err", err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = decodedToken("userJwt");
    if (user) {
      const userId = user.user_id;
      setCheckErr("");

      if (!checked) {
        setCheckErr("Please agree terms and conditions to continue");
      } else {
        setLoading(true);
        const values = {
          userId: userId,
          taskId: task.id,
          title: task.title,
          amount: task.amount,
          image: task.image,
        };
        await createCheckoutSession(values)
          .then((res) => {
            window.location.href = res.data;
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            toast.error("Some error occured. Please try again");
            console.log("This is the error", err);
          });
      }
    } else {
      toast.info("Please login first to subscribe");
      navigate("/login");
    }
  };

  return (
    <div
      className="pt-16 min-h-screen bg-cover overflow-hidden"
      style={{ backgroundImage: `url(${image})` }}
    >
      <Helmet>
        <title>Subscribe Task | MindEase</title>
      </Helmet>
      {loading ? (
        <Loaders />
      ) : (
        <div className="flex flex-col items-center w-full gap-3 mt-16">
          <Typography className="text-blue-900 underline" variant="h5">
            Subscribe the activity and Unlock It!
          </Typography>

          <div className="flex md:flex-row flex-col items-center lg:w-1/2 w-3/4 bg-gray-50 bg-opacity-75 rounded-xl">
            <div className="flex flex-col md:w-1/3 w-1/2 items-center">
              <img
                className="md:w-48 md:h-48 object-cover my-4 shadow-xl rounded-xl"
                src={task?.image}
                alt="skjdfh"
              />
            </div>
            <div className="flex flex-col gap-1 m-2  md:w-2/3 w-full lg:items-start lg:text-start items-center text-center">
              <Typography variant="h5" color="deep-orange">
                {task.title}
              </Typography>

              <Typography
                color="blue-gray"
                className="w-3/4 md:text-base text-xs"
              >
                {task.description}
              </Typography>

              <Typography color="blue">
                Validity : {task.validity} days
              </Typography>

              <Typography
                color="red"
                variant="small"
                className="bg-red-100 px-2 rounded-xl -ms-1"
              >
                Subscription amount : Rs.{task.amount}
              </Typography>
            </div>
          </div>

          <div className="flex flex-col bg-gray-50 bg-opacity-75 lg:w-1/2 w-3/4 rounded-xl items-center text-center p-4">
            <Typography className="underline text-blue-900" variant="paragraph">
              Please read the terms below before the payment
            </Typography>

            <div className="flex flex-col text-start mt-2 gap-1">
              <Typography variant="small" color="blue-gray">
                * This activity will be valid for {task.validity} days counted
                from now. It will expire after the specific time period
              </Typography>

              <Typography variant="small" color="blue-gray">
                * Once your payment is complete, you cannot cancel the
                subscription and there will not be any refund
              </Typography>
            </div>

            <form className="flex flex-col" onSubmit={handleSubmit}>
              <Checkbox
                checked={checked}
                onChange={() => setChecked((cur) => !cur)}
                label={
                  <Typography
                    color="blue-gray"
                    className="flex font-medium"
                    variant="small"
                  >
                    I agree with all the terms and conditions .
                  </Typography>
                }
              />
              {checkErr && (
                <div className="text-red-600 font-mono text-[12px] lg:text-[12px] mb-3">
                  {checkErr}
                </div>
              )}

              <Button type="submit">Proceed to Payment</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubscribePage;
