import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function SetPassword() {
    const [password, setPassword] = useState('')
    const [cPassword, setCPassword] = useState('')
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Set Password'
        if (message) {
            toast.success(message)
        }
    }, [navigate])



    const handlePassword = async (e) => {
        e.preventDefault();
        if (password !== cPassword) {
            toast.error('Password mismatch')
        }
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row h-screen">
                
                <div className="bg-white-200 md:w-1/2 flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-bold text-gray-800">MindEase</h2>

                    <h4 className="text-xl  text-gray-800 mb-4 font-casual">
                        "Find Ease, Unlock Your Peace"
                    </h4>
                    <img
                        src="https://e1.pxfuel.com/desktop-wallpaper/401/734/desktop-wallpaper-doctor-white-backgrounds-doctors-and-patient.jpg"
                        alt="Company Logo"
                        className="w-full h-96 object-contain mb-4"
                    />
                </div>

                <div className="bg-white flex flex-col justify-center items-center md:w-1/2">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Set Your Password</h1>
                    <div className="bg-gray-200 rounded-md shadow-md p-8 w-full max-w-md">
                        <h2 className="text-xl text-gray-800 mb-4">Set your password</h2>
                        <form onSubmit={handlePassword}>
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
                                    name='cPassword'
                                    onChange={(e) => setCPassword(e.target.value)}
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
                                    Set Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SetPassword
