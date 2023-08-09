import { Helmet } from 'react-helmet'
import React, { useState } from 'react'
import image from '../../../images/experience.png'
import {
    Card,
    Input,
    Button,
    Typography,
    Textarea,
} from "@material-tailwind/react";
import { adminAddPsychologicalTasks } from '../../../services/adminApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddTasks() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [validity, setValidity] = useState('')
    const [image, setImage] = useState(null)

    const [titleErr, setTitleErr] = useState('')
    const [descErr, setDescErr] = useState('')
    const [amountErr, setAmountErr] = useState('')
    const [validityErr, setValidityErr] = useState('')
    const [imageErr, setImageErr] = useState('')

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const titleRegex = /^.{10,50}$/;
        const descRegex = /^.{30,}$/;
        const amountRegex = /^\d{3}$/;
        const validityRegex = /^\d{2}$/;

        setTitleErr('')
        setValidityErr('')
        setDescErr('')
        setAmountErr('')
        setImageErr('')

        if (!titleRegex.test(title)) {
            setTitleErr('Title should be character with 10-50 letters long')
        } else if (!validityRegex.test(validity)) {
            setValidityErr('Validity should be number of days in between 10-99')
        } else if (!amountRegex.test(amount)) {
            setAmountErr('Amount should be in between 100-999')
        } else if (!descRegex.test(description)) {
            setDescErr('Description should be min 30 letters long')
        } else if (!image) {
            setImageErr('Upload the image')
        } else {
            const taskForm = new FormData()
            taskForm.append('title', title)
            taskForm.append('image', image)
            taskForm.append('description', description)
            taskForm.append('amount', amount)
            taskForm.append('validity', validity)

            adminAddPsychologicalTasks(taskForm).then((res) => {
                toast.success('Task Added')
                navigate('/admin/psychological-tasks')

            }).catch((err) => {
                console.log('Psy task err:', err);
                if(err.response.data.title) {
                    toast.error('This title is already registered!')
                } else {
                    toast.error('Some error occured. Please try again!')
                }
            })
        }
    }
    return (
        <div className='min-h-screen'>
            <Helmet>
                <title>Add Taks | MindEase</title>
            </Helmet>
            <div className='flex flex-row w-full h-screen'>
                <div className='flex flex-col items-center text-gray-800 w-full mx-4'>

                    <Card color="white" className='md:w-1/2 w-72 items-center bg-opacity-90 bg-gray-100'>
                        <Typography variant="h4" className="text-center mt-10" color="blue-gray">
                            Add Psychological Tasks
                        </Typography>

                        <form className="mt-4 mb-2 w-70 max-w-screen-lg md:w-96" onSubmit={handleSubmit}>
                            <div className="mb-4 flex flex-col gap-2 md:mx-0 mx-3">

                                <Input
                                    size="md"
                                    label="Title"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                {titleErr &&
                                    <span className="text-red-900 text-sm bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                                        {titleErr}
                                    </span>
                                }

                                <Input
                                    size="md"
                                    label="Validity"
                                    onChange={(e) => setValidity(e.target.value)}
                                />
                                {validityErr &&
                                    <span className="text-red-900 text-sm bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                                        {validityErr}
                                    </span>
                                }

                                <Input
                                    size="md"
                                    label="Subscription Amount"
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                {amountErr &&
                                    <span className="text-red-900 text-sm bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                                        {amountErr}
                                    </span>
                                }

                                <Textarea
                                    size="md"
                                    label="Description"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                {descErr &&
                                    <span className="text-red-900 text-sm bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                                        {descErr}
                                    </span>
                                }

                                <Input
                                    type="file"
                                    size="md"
                                    label="Upload Image"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                                {imageErr &&
                                    <span className="text-red-900 text-sm bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                                        {imageErr}
                                    </span>
                                }

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

export default AddTasks
