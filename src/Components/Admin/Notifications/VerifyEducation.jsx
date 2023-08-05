import { Button, Card, Input, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import certificateImage from '../../../images/educertificate.jpg'
import CertificateView from './CertificateView';
import {
    CheckCircleIcon,
    XCircleIcon
} from "@heroicons/react/24/solid";
import VerifyModal from './VerifyModal';
import { toast } from 'react-toastify';
import { adminDeclineEducationReqs, adminGetEducationDetails, adminVerifyEducationReqs } from '../../../Services/adminApi';
import { useNavigate } from 'react-router-dom';

function VerifyEducation() {
    const [open, setOpen] = useState(false);
    const [verify, setVerify] = useState(false)
    const [decline, setDecline] = useState(false)
    const [details, setDetails] = useState({})
    const navigate = useNavigate()

    const urlParams = new URLSearchParams(window.location.search);
    const requestId = urlParams.get('request');

    const handleOpen = () => setOpen((cur) => !cur);
    const hanldeVerify = () => setVerify((cur) => !cur)
    const handleDecline = () => setDecline((cur) => !cur)

    useEffect(() => {
        getEducationDetails();
    }, [])

    async function getEducationDetails() {
        await adminGetEducationDetails(requestId).then((res) => {
            setDetails(res.data)
        }).catch((err) => {
            console.log('Educational error:', err);
        })
    }

    const handleApproveRequest = async () => {
        await adminVerifyEducationReqs(requestId).then((res) => {
            console.log('Verify result:', res);
            toast.success(res.data.message)
            navigate('/admin/notifications/')
        }).catch((err) => {
            toast.error('Some error occured. Please try again')
            console.log('verify error:', err);
            navigate('/admin/notifications/')
        })
    }

    const handleDeclineRequest = async () => {
        await adminDeclineEducationReqs(requestId).then((res) => {
            toast.success('Request declined!')
            navigate('/admin/notifications/')
        }).catch((err) => {
            console.log('Decline error:', err);
            toast.error('Some error occured. Please try again')
            navigate('/admin/notifications/')


        })
    }




    return (
        <div>
            <Helmet>
                <title>
                    Verify Education
                </title>
            </Helmet>
            <div className='flex flex-col min-h-screen pt-2 gap-5 mt-5'>


                <div className='flex flex-col items-center mx-2 text-center'>
                    <div className='flex flex-col items-center shadow-md rounded-lg border-t md:w-2/3 w-full bg-gray-50 py-4 mb-16'>

                        <div className='mt-3 text-center'>
                            <Typography variant="h5" >Verify Counselor's education</Typography>
                        </div>

                        <div className='flex flex-col md:w-3/4 w-full gap-4 pb-4 mt-2'>

                            <div className='flex md:flex-row flex-col md:mx-0 mx-5 justify-center gap-3'>
                                {details.counselor && (
                                    <Input
                                        size="md"
                                        label="User"
                                        value={details.counselor.first_name + ' ' + details.counselor.last_name}
                                        readOnly
                                        className='bg-gray-200'
                                    />
                                )}

                                <Input
                                    size="md"
                                    label="University"
                                    value={details.university}
                                    readOnly
                                />
                            </div>

                            <div className='flex md:flex-row flex-col md:mx-0 mx-5 justify-center gap-3'>
                                <Input
                                    size="md"
                                    label="Qualification"
                                    value={details.qualification}
                                    readOnly
                                />

                                <Input
                                    size="md"
                                    label="Academic Year"
                                    value={details.year}
                                    readOnly
                                    className='bg-gray-200'
                                />
                            </div>

                            <div className='flex md:flex-row flex-col md:mx-0 mx-5 justify-center gap-3'>
                                <Input
                                    size="md"
                                    label="State"
                                    value={details.state}
                                    readOnly
                                    className='bg-gray-200'
                                />

                                <Input
                                    size="md"
                                    label="Country"
                                    value={details.country}
                                    readOnly
                                />
                            </div>


                            <Card
                                className="w-full shadow-none"
                                onClick={handleOpen}
                                color='transparent'
                            >
                                <Typography className='text-left ms-14 underline'>
                                    Certificate
                                </Typography>
                                <img
                                    alt="nature"
                                    className="mx-10 my-3 rounded-lg object-cover object-center cursor-pointer overflow-hidden hover:opacity-80"
                                    src={details.certificate}
                                />
                            </Card>
                            {open &&
                                <CertificateView open={open} handler={handleOpen} certificate={certificateImage} />
                            }

                            <div className='flex flex-row justify-center gap-3'>

                                <Button
                                    className='flex w-1/4  justify-center gap-3'
                                    color='green'
                                    onClick={hanldeVerify}
                                >
                                    <CheckCircleIcon strokeWidth={2} className="-mt-0.5 h-4 w-4" />
                                    Verify
                                </Button>

                                <Button
                                    className='flex w-1/4  justify-center gap-3'
                                    color='red'
                                    onClick={handleDecline}
                                >
                                    <XCircleIcon strokeWidth={2} className=" -mt-0.5 h-4 w-4" />
                                    Deny
                                </Button>

                                {decline && <VerifyModal
                                    handler={handleDecline}
                                    open={decline}
                                    message='Decline'
                                    action={handleDeclineRequest}
                                />}

                                {verify && <VerifyModal
                                    handler={hanldeVerify}
                                    open={verify}
                                    message='Approval'
                                    action={handleApproveRequest}
                                />}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default VerifyEducation
