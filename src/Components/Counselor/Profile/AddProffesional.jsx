import React, { useEffect, useState } from 'react'
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
} from "@material-tailwind/react";
import { listCounselorServices, updateCounselorAccount } from '../../../Services/counselorApi';
import { toast } from 'react-toastify';
import { decodedToken } from '../../../Context/auth';

function AddProffesional({ getProffessional }) {
    const [open, setOpen] = useState(false);
    const [services, setServices] = useState([])

    const [fee, setFee] = useState('')
    const [specialization, setSpecialization] = useState('')
    const [state, setState] = useState('')

    const [feeErr, setFeeErr] = useState('')
    const [specErr, setSpecErr] = useState('')
    const [stateErr, setStateErr] = useState('')

    useEffect(() => {
        listServices();
    }, [getProffessional])

    const listServices = async () => {
        await listCounselorServices().then((res) => {
            setServices(res.data)
            console.log('Services', services);
        })
    }

    const handleAddSpecialization = async (e) => {
        e.preventDefault();

        const feeRegex = /^\d{3}$/;
        const stateRegex = /^[a-zA-Z' ']{3,}$/;

        setFeeErr('')
        setSpecErr('')
        setStateErr('')

        if (!feeRegex.test(fee)) {
            setFeeErr('Fee should be between 100-999')
        } else if (specialization.trim() === '') {
            setSpecErr('Select area of specialization')
        } else if (!stateRegex.test(state)) {
            setStateErr('Invalid State Format')
        } else {
            const token = decodedToken('counselorJwt')
            const id = token.counselor
            const values = {
                'fee': fee,
                'specialization': specialization,
                'state': state
            }

            await updateCounselorAccount(id,values).then((res) => {
                toast.success('Details added!')
                handleOpen();
                getProffessional();
            }).catch((err)=>{
                toast.error('Some error occured!')
                console.log('Account add error',err);
            })
        }





    }

    const handleOpen = () => setOpen((cur) => (!cur))


    const handleSubmit = async (e) => {
        e.preventDefault();

    }


    return (
        <div>
            <Button
                className='py-1 w-20'
                color='blue-gray'
                onClick={handleOpen}
            >Add</Button>

            <Dialog
                size="xs"
                open={open}
                handler={handleOpen}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto grid place-items-center w-full max-w-[24rem] rounded-none" >
                    <CardHeader
                        variant="gradient"
                        className="grid place-items-center m-auto bg-blue-gray-500 h-12 w-full rounded-none"
                    >
                        <Typography variant="h5" color="white" className='font-normal '>
                            Add Proffessional Details
                        </Typography>
                    </CardHeader>
                    <form onSubmit={handleAddSpecialization} encType='multipart/form-data'>
                        <CardBody className="flex flex-col gap-4 w-80">

                            <Input
                                label="Fee"
                                size="lg"
                                onChange={(e) => setFee(e.target.value)}
                            />
                            {feeErr &&
                                <span className="text-red-900 text-sm bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                                    {feeErr}
                                </span>
                            }

                            <select
                                onChange={(e) => setSpecialization(e.target.value)}
                                className='bg-transparent border border-blue-gray-200 rounded h-10'
                            >
                                <option value=''>Specialization</option>
                                {services && services.map((service, index) => (

                                    <option key={index} value={service.id}>{service.title}</option>
                                ))}

                            </select>
                            {specErr &&
                                <span className="text-red-900 text-sm bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                                    {specErr}
                                </span>
                            }

                            <Input label="State"
                                className="w-1/2"
                                size="lg"
                                onChange={(e) => setState(e.target.value)}
                            />
                            {stateErr &&
                                <span className="text-red-900 text-sm bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                                    {stateErr}
                                </span>
                            }


                        </CardBody>
                        <CardFooter className="pt-0 mb-3">
                            <Button
                                variant="gradient"
                                color="blue-gray"
                                type="submit"
                                fullWidth
                            >
                                save
                            </Button>

                        </CardFooter>
                    </form>
                </Card>
            </Dialog>
        </div>
    )
}

export default AddProffesional
