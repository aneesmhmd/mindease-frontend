import React, { useEffect, useState } from 'react'
import { adminGetTaskDetails, adminGetTaskItems } from '../../../services/adminApi';
import { Button, Typography } from '@material-tailwind/react';
import ItemsTable from './ItemsTable';

function ViewTasks() {
    const [task, setTask] = useState({})
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('task');


    useEffect(() => {
        getTask();
    }, [])

    const getTask = async () => {
        adminGetTaskDetails(taskId).then((res) => {
            setTask(res.data)
        }).catch((err) => {
            console.log('Task det err', err);
        })
    }

   



    return (
        <div className='flex items-center flex-col gap-5'>

            <div className='flex md:flex-row flex-col shadow-lg border-t bg-gray-200 bg-opacity-90 rounded-lg w-3/4 p-3'>

                <div className='flex flex-col items-center lg:w-1/4'>
                    <img
                        className="h-40 w-40 rounded-lg object-cover shadow-xl border-2"
                        src={task.image && task.image}
                        alt={task.title} />

                </div>

                <div className='flex  flex-col lg:w-3/4 mt-4 lg:items-start items-center  gap-1'>
                    <h1 className="font-serif font-semibold text-lg text-blue-800">
                        {task.title}
                    </h1>

                    <h1 className='text-sm font-sans'>
                        {task.description}
                    </h1>
                    <Typography color='blue'>Validity : {task.validity} days</Typography>
                    <Typography color='red'>Amount : Rs.{task.amount}</Typography>
                </div>
            </div>

            <div className='flex flex-col w-3/4'>

                <ItemsTable taskId={taskId}/>

            </div>
        </div>
    )
}

export default ViewTasks
