import React, { useEffect, useState } from "react";
import { listSubscribedTaskItems } from "../../../../services/userApi";
import { decodedToken } from "../../../../Context/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../../../../constants/constants";
import image from "../../../../images/subBg.jpg";
import { Button, Typography } from "@material-tailwind/react";
import { Helmet } from "react-helmet";

function TaskItems() {
  const [taskItems, setTaskItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    listTaskItems();
  }, []);

  const listTaskItems = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const subId = urlParams.get("uid");
    const user = decodedToken("userJwt");
    if (user) {
      listSubscribedTaskItems(user.user_id, subId)
        .then((res) => {
          setTaskItems(res.data);
          console.log("TI :", res.data);
        })
        .catch((err) => {
          console.log("TI error", err);
        });
    } else {
      toast.info("Please login");
      navigate("/login");
    }
  };

  return (
    <div
      className="pt-20 min-h-screen object-cover"
      style={{ backgroundImage: `url(${image})` }}
    >
      <Helmet>
        <title>{taskItems[0]?.task?.title}</title>
      </Helmet>
      <div className="flex items-center flex-col gap-5 mt-7">
        <div className="flex md:flex-row flex-col bg-white bg-opacity-25 shadow-xl border-t rounded-lg md:w-1/2 md:text-start text-center w-3/4 p-3">
          <div className="flex flex-col items-center lg:w-1/4">
            <img
              className="h-32 w-32 rounded-lg object-cover shadow-xl border-2"
              src={
                taskItems[0]?.task?.image &&
                `${BaseUrl + taskItems[0]?.task?.image}`
              }
              alt={taskItems[0]?.task?.title}
            />
          </div>

          <div className="flex  flex-col lg:w-3/4 lg:items-start justify-center items-center -mt-2 gap-2">
            <h1 className="font-serif font-semibold text-lg text-blue-800">
              {taskItems[0]?.task?.title}
            </h1>

            <h1 className="text-sm font-sans">
              {taskItems[0]?.task?.description}
            </h1>
          </div>
        </div>
        <hr className="w-1/3" />

        {taskItems &&
          taskItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 bg-white bg-opacity-25 shadow-xl rounded-xl md:w-1/2 w-3/4 p-4"
            >
              <div className="flex flex-col gap-1">
                <Typography variant="paragraph" color="teal">
                  {item.title}
                </Typography>
                <Typography variant="small" className="-mt-2" color="blue-gray">
                  {item.instructions}
                </Typography>
                <button
                  className="w-24 bg-dark-purple text-white rounded-md px-2"
                  onClick={() => window.open(`${item.demo_link}`)}
                >
                  See Demo
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TaskItems;
