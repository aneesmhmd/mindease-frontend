import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const navigate = useNavigate();
    const data = { 'email': email }

    useEffect(() => {
        document.title = "Forgot Password | MindEase";
    });

    const handleResetPassword = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/forgot-password/', data).then((response) => {
            const dat = response.data;
            localStorage.setItem('user_id', dat.user_id);

            Swal.fire('Message', response.data.msg, response.data.status)
        }).catch((error) => {
            Swal.fire('Error', error.response.data.message, 'error')
        })
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
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
                <h2 className="text-2xl text-gray-800">Online Counseling Platform</h2>

            </div>
            <div className="bg-white flex flex-col justify-center items-center md:w-1/2">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Forgot Password</h1>
                <div className="bg-gray-200 rounded-md shadow-md p-8 w-full max-w-md">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Reset Password</h2>
                    <form onSubmit={handleResetPassword}>
                        <div className="mb-4">
                            <label htmlFor="email" className="sr-only">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name='email'
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-400 rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
                            >
                                Get Reset Link
                            </button>
                        </div>
                        <div className="text-center">
                            <span className="text-gray-600">Got password?</span>
                            <button
                                type="button"
                                className="text-blue-500 hover:underline ml-1"
                                onClick={() => navigate("/login")}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
