import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Reset Password | MindEase";
    });

    const user_id = localStorage.getItem('user_id')
    console.log(user_id)
    const data = { 'password': password, 'user_id': user_id }

    const handleResetPassword = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.warning("Password didn't match");
        } else {
            axios.post(import.meta.env.VITE_BASE_URL + '/api/reset-password/', data).then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem('user_id')
                    Swal.fire('Password reset', response.data.msg, 'success').then(() => {
                        window.location.href = '/login/';
                    });
                }
            })
        }

    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* <ToastContainer position='top-center' reverseOrder='false' ></ToastContainer> */}
            <div className="bg-white-200 md:w-1/2 flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold text-gray-800">MindEase</h2>

                <h4 className="text-xl  text-gray-800 mb-4 font-casual">
                    "Find Ease, Unlock Your Peace"
                </h4>
                <img
                    src="https://www.samvednacare.com/blog/wp-content/uploads/2022/02/Samvedhna_Feb_Blog-01-1.png"
                    alt="Company Logo"
                    className="w-96 h-96 object-contain mb-4"
                />
            </div>
            <div className="bg-white flex flex-col justify-center items-center md:w-1/2">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Reset Password</h1>
                <div className="bg-gray-200 rounded-md shadow-md p-8 w-full max-w-md">
                    <h2 className="text-xl text-gray-800 mb-4">Reset your password</h2>
                    <form onSubmit={handleResetPassword}>
                        <div className="mb-4">
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name='password'
                                onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-400 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="confirmpassword" className="sr-only">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmpassword"
                                name='confirmpassword'
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="border border-gray-400 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                                placeholder="Confirm password"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
