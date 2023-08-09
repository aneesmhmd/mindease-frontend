import { Button, Card, Input, Textarea, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { adminAddTaskItem } from '../../../services/adminApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AddTaskItem() {

    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('task');

    const [title, setTitle] = useState('')
    const [instructions, setInstructions] = useState('')
    const [demoLink, setDemoLink] = useState('')

    const navigate = useNavigate()

    const handleAddTaskItem = async (e) => {
        e.preventDefault();
        const values = { 'title': title, 'instructions': instructions, 'demo_link': demoLink ,'task' : taskId}
        await adminAddTaskItem(taskId, values).then((res)=>{
            toast.success('Activity added succesfully')
            navigate(`/admin/view-tasks/?task=${taskId}`)
        }).catch((err)=>{
            toast.error('Some error occured')
            console.log('Err', err);
    })
    }
    return (
        <div className='min-h-screen'>
            <Helmet>
                <title>Add Task Activities | MindEase</title>
            </Helmet>
            <div className='flex flex-row w-full h-screen'>
                <div className='flex flex-col items-center text-gray-800 w-full mx-4'>

                    <Card color="white" className='md:w-1/2 w-72 items-center bg-opacity-90 bg-gray-100'>
                        <Typography variant="h4" className="text-center mt-10" color="blue-gray">
                            Add Task Activities
                        </Typography>

                        <form className="mt-4 mb-2 w-70 max-w-screen-lg md:w-96" onSubmit={handleAddTaskItem}>
                            <div className="mb-4 flex flex-col gap-2 md:mx-0 mx-3">

                                <Input
                                    size="md"
                                    label="Title"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                {/* {titleErr &&
                            <span className="text-red-900 text-sm bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                                {titleErr}
                            </span>
                        } */}

                                <Textarea
                                    size="md"
                                    label="Instruction"
                                    onChange={(e) => setInstructions(e.target.value)}
                                />


                                <Input
                                    size="md"
                                    label="Demo Link"
                                    onChange={(e) => setDemoLink(e.target.value)}
                                />


                            </div>

                            <Button className="my-6" type='submit' fullWidth>
                                Add
                            </Button>

                        </form>
                    </Card>

                </div>


            </div>

        </div>
    )
}

export default AddTaskItem
