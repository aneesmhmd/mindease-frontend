import React, { useEffect, useState } from "react";
import { getSubscribedTasks } from "../../../../services/userApi";
import { decodedToken } from "../../../../Context/auth";
import { Link, useNavigate } from "react-router-dom";
import { BaseUrl } from "../../../../constants/constants";
import { Typography } from "@material-tailwind/react";
import axios from "axios";

function SubscribedTasks() {
  const [subscriptions, setSubscriptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    listSubscribed();
  }, []);

  const listSubscribed = async () => {
    const user = decodedToken("userJwt");
    if (user) {
      await axios.get(BaseUrl + '/user/get-subscribed-tasks/' +user.user_id)
        .then((res) => {
          setSubscriptions(res.data);
          console.log("subs", res.data);
        })
        .catch((err) => {
          console.log("Subs err", err);
        });
    } else {
      toast.info("Please login first!");
      navigate("/login");
    }
  };
  return (
    <div className="flex flex-col w-full gap-7 px-4">
      {subscriptions && subscriptions.length > 0 ? (
        subscriptions.map((subscription, index) => (
          <div
            key={index}
            className="flex md:flex-row flex-col justify-around items-center w-full"
          >
            <div className="flex flex-col items-center md:w-1/3">
              <img
                className="w-20 h-20 me-4 object-cover my-2 shadow-xl rounded-xl"
                src={`${BaseUrl + subscription?.task?.image}`}
                alt={subscription?.task?.title}
              />
              <Typography>{subscription?.task?.title}</Typography>
            </div>

            <div className="flex flex-col items-center md:w-1/3">
              {subscription?.is_expired ? (
                <Typography color="gray">Expired</Typography>
              ) : (
                <Typography color="blue-gray">
                  Valid till {subscription?.expiry_date}
                </Typography>
              )}
            </div>

            <div className="flex flex-col items-center md:w-1/3">
              {subscription?.is_expired ? (
                <button className="bg-gray-500 px-4 rounded-xl text-white text-sm">
                  Expired
                </button>
              ) : (
                <Link
                  to={`/view-task/?task=${subscription?.task?.title}&uid=${subscription?.id}`}
                >
                  <button className="bg-dark-purple px-2 rounded-xl text-white text-sm">
                    Continue Task
                  </button>
                </Link>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center">
          <h1>You haven't taken any subscriptions yet</h1>
        </div>
      )}
    </div>
  );
}

export default SubscribedTasks;
