import React, { useEffect, useState } from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { adminListEducationReqs } from '../../../Services/adminApi';


function EducationNotification() {
    const [requests, setRequests] = useState([])

    useEffect(() => {
        getEducationRequests();
    }, [])

    async function getEducationRequests() {
        await adminListEducationReqs().then((res) => {
            setRequests(res.data);
            console.log('Educational details', requests);
        }).catch((err) => {
            console.log('Education error', err);
        })
    }
    return (
        <div>
            <div className='flex flex-col w-full'>
                <div className='flex justify-center items-center sm:w-1/2 w-full py-2 bg-dark-purple mx-auto mt-3 rounded-t-2xl'>
                    <h1 className='text-white font-sans font-semibold text-base capitalize'>counselor education Requests</h1>
                </div>

                <Card className="flex flex-col sm:w-1/2 w-full mx-auto lg:gap-3 gap-6 rounded-b-2xl py-5">
                    <CardBody className='py-0'>

                        <div className='flex  flex-col gap-3'>

                            {requests && requests.map((item, index) => (
                                <div key={index} className='flex lg:flex-row flex-col justify-center lg:gap-5 gap-1 lg:mx-0 mx-10'>

                                    <Typography>
                                        <span className='font-extrabold text-black'>
                                            {item.counselor.first_name}&nbsp;
                                        </span>
                                        added&nbsp;
                                        <span className='text-black font-extrabold'>
                                            {item.qualification}
                                        </span>.
                                        Check it and verify
                                    </Typography>
                                    <Link to={`verify-education/?request=${item.id}`}>
                                        <Button
                                            className='py-1 px-2 rounded-full self-start'
                                            size='sm'
                                            color='blue'
                                        >
                                            Check
                                        </Button>
                                    </Link>
                                </div>

                            ))}


                        </div>
                    </CardBody>


                    {/* <CardFooter className="flex items-center border-t-2 p-0">
                        <Button
                            className='flex flex-row mx-auto p-1 mt-3 rounded-full'
                            size='sm'
                            color='green'
                        >
                            Check
                        </Button>
                    </CardFooter> */}
                </Card>
            </div>

        </div>
    )
}

export default EducationNotification
