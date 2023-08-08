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
    Select,
    Option,
} from "@material-tailwind/react";
import { listCounselorServices, updateCounselorAccount } from '../../../Services/counselorApi';
import { decodedToken } from '../../../Context/auth';
import { toast } from 'react-toastify';

function EditProffesional({ getProffessional, proffessional }) {
    const [open, setOpen] = useState(false);
    const [fee, setFee] = useState(proffessional.fee)
    const [state, setState] = useState(proffessional.state)
    const [specialization, setSpecialization] = useState(proffessional.specialization_details)
    const [updatedSpec, setUpdatedSpec] = useState(specialization.id)
    const [services, setServices] = useState([])
    const [isChange, setIsChanged] = useState(false)

    const [feeErr, setFeeErr] = useState('')
    const [specErr, setSpecErr] = useState('')
    const [stateErr, setStateErr] = useState('')

    const handleOpen = () => setOpen((cur) => (!cur))

    useEffect(() => {
        listSerives();
    }, [proffessional])

    const listSerives = async (e) => {
        listCounselorServices().then((res) => {
            setServices(res.data)
        }).catch((err) => {
            console.log('Edit ser err', err);
        })
    }

    const handleEditProffessional = async (e) => {
        e.preventDefault();

        const feeRegex = /^\d{3}$/;
        const stateRegex = /^[a-zA-Z' ']{3,}$/;

        setFeeErr('')
        setSpecErr('')
        setStateErr('')

        if (!feeRegex.test(fee)) {
            setFeeErr('Fee should be between 100-999')
        } else if (!stateRegex.test(state)) {
            setStateErr('Invalid state format')
        } else if (isChange && !updatedSpec) {
            setSpecErr('Select a specialization')
        } else {
            const token = decodedToken('counselorJwt')
            const id = token.counselor
            const values = {
                'fee': fee,
                'state': state,
                'specialization': updatedSpec
            }
            await updateCounselorAccount(id,values).then((res)=>{
                handleOpen();
                getProffessional();
                toast.success('Details updated')
            }).catch((err)=>{
                console.log('Err', err);
                toast.error('Something went wrong!')
            })
        }
    }

    return (
        <div>
            <Button
                className='py-1 w-20'
                color='blue-gray'
                onClick={handleOpen}
            >Edit</Button>

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
                    <form onSubmit={handleEditProffessional}>
                        <CardBody className="flex flex-col gap-4 w-80">

                            <Input
                                value={fee && fee}
                                label="Fee"
                                size="lg"
                                onChange={(e) => {
                                    setFee(e.target.value)

                                }}
                            />
                            {feeErr &&
                                <span className="text-red-900 text-sm bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                                    {feeErr}
                                </span>
                            }

                            <select
                                className='bg-transparent border border-blue-gray-200 rounded h-10'
                                onChange={(e) => {
                                    setUpdatedSpec(e.target.value)
                                    setIsChanged(true)
                                }}
                            >
                                <option>{specialization.title}</option>
                                {services && services.map((service, index) => (
                                    <option key={index} value={service.id}>{service.title}</option>

                                ))}


                            </select>
                            {specErr &&
                                <span className="text-red-900 text-sm bg-red-300 bg-opacity-40 text-center rounded-lg p-2">
                                    {specErr}
                                </span>
                            }

                            <Input
                                value={state && state}
                                label="State"
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
                                Save Changes
                            </Button>

                        </CardFooter>
                    </form>
                </Card>
            </Dialog>
        </div>
    )
}

export default EditProffesional
