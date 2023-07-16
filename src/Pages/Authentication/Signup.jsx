import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import { useGoogleLogin } from '@react-oauth/google';
import { googleAuthentication } from '../../Services/userApi';
import jwtDecode from 'jwt-decode';


const Signup = () => {
    useEffect(() => {
        document.title = "Signup | MindEase";
    });

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [user, setUser] = useState(null)

    const [errors, setErrors] = useState({});


    const navigate = useNavigate('');

    const values = {
        first_name,
        last_name,
        email,
        password,
        phone,
        // role,
    };

    // Email register
    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            Swal.fire('Oops!', 'Password didnt match', 'warning')
        } else {
            await axios.post(import.meta.env.VITE_BASE_USER_URL + '/api/register/', values).then((response) => {
                Swal.fire('Registration Success', response.data.msg, 'success').then(
                    navigate('/login')
                );
            }).catch((error) => {
                Swal.fire('Error', error.response.data.message, 'error');
            });
        }
    };

    // Google login
    const handleGoogleAuth = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        if (user) {
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    Accept: 'application/json'
                }
            })
                .then((res) => {
                    const userProfile = res.data
                    googleAuthentication(userProfile).then((res) => {
                        console.log('final result :', jwtDecode(JSON.stringify(res.data.token)));
                        if (res.data.status === 200) {
                            localStorage.setItem('authToken', JSON.stringify(res.data.token));
                            toast.success(res.data.msg)
                            navigate('/')
                        } else if (res.data.status === 400) {
                            toast.error(res.data.msg)
                        }
                    })
                })
                .catch((err) => toast.error('Something went wrong!'));
        }
    }, [user])

    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="bg-white-200 md:w-1/2 flex flex-col justify-center items-center">
                <h2 className="text-2xl font-bold text-gray-800">MindEase</h2>
                <h4 className="text-xl text-gray-800 mb-4 font-casual">
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
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    Register your account here
                </h1>
                <form onSubmit={handleSignup} className="w-full max-w-sm">
                    <div className="mb-4">
                        <label htmlFor="firstName" className="sr-only">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            name="first_name"
                            onChange={(e) => setFirstName(e.target.value)}
                            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                            placeholder="First Name"
                        // required
                        />
                        <div className="w-3/4 ms-16 mt-2">
                            {errors.first_name && <div className="text-red-500 text-center   bg-purple-200 rounded-md p-2 text-xs ">{errors.first_name.message}</div>}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="sr-only">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            name="last_name"
                            onChange={(e) => setLastName(e.target.value)}
                            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Last Name"
                        // required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="sr-only">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Email"
                        // required
                        />
                        {/* {errors.email && <span>{errors.email}</span>} */}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="sr-only">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phone"
                            onChange={(e) => setPhone(e.target.value)}
                            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Phone Number"
                        // required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="sr-only">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Password"
                        // required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="sr-only">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirm_password"
                            id="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border rounded-md py-2 px-3 w-full focus:outline-none focus:border-blue-500"
                            placeholder="Confirm Password"
                        // required
                        />
                    </div>

                    <div className="mb-4 flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 md:w-full"
                        >
                            Sign Up
                        </button>
                        <ToastContainer />
                    </div>
                    <div className="mb-4">
                        <button
                            type="button"
                            className="bg-white text-gray-500 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 w-full"
                            onClick={handleGoogleAuth}
                        >
                            <FontAwesomeIcon
                                icon={faGoogle}
                                className="text-blue-500 mr-2"
                            />
                            Continue with Google
                        </button>
                    </div>
                    <div className="text-center">
                        <span className="text-gray-600">Already have an account?</span>
                        <button
                            type="button"
                            className="text-blue-500 hover:underline ml-1"
                            onClick={() => navigate('/login')}
                        >
                            Log In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
