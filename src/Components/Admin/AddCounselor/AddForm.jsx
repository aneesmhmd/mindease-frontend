import React, {useEffect, useState} from 'react'
import {toast} from 'react-toastify';
import {addCounselor} from '../../../Services/adminApi';
import axios from 'axios';
import {AdminUrl} from '../../../constants/constants';
import {useNavigate} from 'react-router-dom';
import { Helmet } from 'react-helmet';

function AddForm() {

    const [values, setValues] = useState({
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        password: ""
    })
    const navigate = useNavigate()

    useEffect(() => {
        setValues({
            ...values,
            ['password']: values.email
        })
    }, [values.email])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (values.first_name.trim() === "") {
                toast.error('First name cannot be empty')
            } else if (values.last_name.trim() === "") {
                toast.error('Last name cannot be empty')
            } else if (values.email.trim() === "") {
                toast.error('Email cannot be empty')
            } else if (values.phone.trim() === "") {
                toast.error('Phone number cannot be empty')
            } else {
                addCounselor(values).then((res) => {
                    // const toastId = toast.loading('Verification email sending')
                    if (res.status === 200) {
                        // toast.dismiss(toastId)
                        toast.success('Counselor added succesfully')
                        navigate('/admin/counselors')
                    } else {
                        toast.error('Counselor registration failed')
                    }
                }).catch((error) => {
                  console.log('Error' ,error);
                    toast.error(error.message)
                })


                // axios.post(`${AdminUrl}/add-counselor/`, values).then((res) => {
                //    if (res.status === 200) {
                //       toast.success('Counselor added succesfully')
                //       navigate('/admin/counselors')
                //     } else {
                //       toast.error('Counselor registration failed')
                //     }
                // }).catch((error) => {
                //   console.log(error);
                //     toast.error(error.message)
                // })


            }

        } catch (error) {
            console.log(error.message);
        }
    }


    return (
        <div className='flex justify-center flex-col md:w-1/2 items-center '>

            <h1 className='justify-center font-bold md:text-2xl text-gray-800 mb-4'>Add Psychologist</h1>
            <form onSubmit={handleSubmit}
                className="flex flex-col items-center w-full border-t max-w-xl shadow-lg rounded-lg bg-gray-50">

                <div className="md:w-full">
                    <label htmlFor="firstName" className="sr-only">
                        First Name
                    </label>
                    <div className="relative py-2 px-8 mt-5">
                        <input type="firstName" id="firstName" name="first_name"
                            onChange={
                                (e) => setValues({
                                    ...values,
                                    [e.target.name]: e.target.value
                                })
                            }
                            className="border rounded-md pl-10 py-2  w-full "
                            placeholder="First Name"/>
                    </div>
                </div>

                <div className="md:w-full">
                    <label htmlFor="lastName" className="sr-only">
                        Last Name
                    </label>
                    <div className="relative py-2 px-8">
                        <input type="lastName" id="lastName" name="last_name"
                            onChange={
                                (e) => setValues({
                                    ...values,
                                    [e.target.name]: e.target.value
                                })
                            }
                            className="border rounded-md pl-10 py-2  w-full focus:outline-none focus:border-blue-500"
                            placeholder="Last Name"/>
                    </div>
                </div>

                <div className="md:w-full">
                    <label htmlFor="email" className="sr-only">
                        Email
                    </label>
                    <div className="relative py-2 px-8">
                        <input type="text" id="email" name="email"
                            onChange={
                                (e) => setValues({
                                    ...values,
                                    [e.target.name]: e.target.value
                                })
                            }
                            className="border rounded-md pl-10 py-2  w-full focus:outline-none focus:border-blue-500"
                            placeholder="Email"/>
                    </div>
                </div>

                <div className="md:w-full mb-4">
                    <label htmlFor="phone" className="sr-only">
                        Phone Number
                    </label>
                    <div className="relative py-2 px-8">
                        <input type="text" id="phone" name="phone"
                            onChange={
                                (e) => setValues({
                                    ...values,
                                    [e.target.name]: e.target.value
                                })
                            }
                            className="border rounded-md pl-10 py-2  w-full focus:outline-none focus:border-blue-500"
                            placeholder="Phone Number"/>
                    </div>
                </div>

                <div className="mb-6 md:w-1/2">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full">
                        Create
                    </button>
                </div>

            </form>


        </div>
    )
}

export default AddForm
