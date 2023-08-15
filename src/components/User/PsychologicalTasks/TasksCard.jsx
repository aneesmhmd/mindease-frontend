import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { listPsychologicalTasks } from "../../../services/userApi";
import { Link, useNavigate } from "react-router-dom";
import { decodedToken } from "../../../Context/auth";
import { toast } from "react-toastify";

function TasksCard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    await listPsychologicalTasks()
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log("Task fetch er", err);
      });
  };

  const handleSubmit = (id) =>{
    const user = decodedToken('userJwt')
    if(user){
      navigate(`/subscribe-task/?task=${id}`)
    }else{
      navigate('/login')
      toast.info('Please login first to subscribe')
    }
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-8">
        <Typography className="mt-4 text-blue-800 lg:text-2xl text-lg font-semibold underline text-center">
          MindEase Psychological Activities
        </Typography>

        {tasks &&
          tasks.map((task, index) => (
            <div
              key={index}
              className="flex lg:flex-row flex-col md:bg-transparent bg-gray-100 w-1/2 p-2"
            >
              <div className="flex flex-col lg:w-1/3 w-full lg:items-end items-center overflow-hidden">
                <img
                  className="md:w-56 md:h-56 me-4 object-cover mt-2 shadow-xl rounded-xl"
                  src={task?.image}
                  alt="skjdfh"
                />
              </div>

              <div className="flex flex-col gap-3 lg:w-2/3 w-full lg:items-start lg:text-start items-center text-center mt-5">
                <Typography variant="h5" color="deep-orange">
                  {task.title}
                </Typography>

                <Typography
                  color="blue-gray"
                  className="lg:w-full w-2/3 md:text-base text-xs"
                >
                  {task.description}
                </Typography>

                <Typography color="blue">
                  Validity : {task.validity} days
                </Typography>
                {/* <Link to={`/subscribe-task/?task=${task.id}`}> */}
                  <Button className="w-max" size="sm" color="deep-orange" onClick={()=>handleSubmit(task.id)}>
                    Try it for Rs.{task.amount}/-
                  </Button>
                {/* </Link> */}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default TasksCard;
