import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { counselorLogin } from '../../Services/counselorApi'

function CounselorLogin() {
    const [email, setEmail] =useState('')
    const [password, setPassword] =useState('')
    const navigate = useNavigate()
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');

    useEffect(()=>{
        if(message){
            toast.success(message)
        }
    },[navigate])



    const handleCounselorLogin = async (e) => {
        e.preventDefault(); // Prevents the form submission

        if (email.trim() === '') {
            toast.error('Enter email');
        } else if (!isValidEmail(email.trim())) {
            toast.warn('Enter a valid email');
        } else if (password.trim() === '') {
            toast.error('Enter password');
        } else {
            try{
                counselorLogin({email,password}).then((res)=>{
                    if(res.status === 200){
                        localStorage.setItem('counselorJwt', JSON.stringify(res.data.token))
                        toast.success(res.data.message)
                        navigate('/counselor/home')
                    }
                }).catch((error)=>{
                    console.log(error);
                    toast.error(error.response.data.message)
                    navigate('/login')
                })
            }catch(error){
                console.log('This is the error:',error);
                toast.error('An error occured. Please try again.')
            }
           
        }
    }

    // Email validation function
    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    return (
        <div>


            <section className="bg-gray-300 min-h-screen flex items-center justify-center">
                <div className="bg-gray-50 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                    <div className="md:w-1/2 px-8 md:px-16">
                        <h1 className="font-bold font-sans text-2xl text-[#002D74] mb-5">MindEase</h1>
                        <h2 className="font-medium text-2xl text-[#002D74]">Counselor Login</h2>
                        <p className="text-xs mt-4 text-[#002D74]">Login to your account as counselor</p>

                        <form className="flex flex-col gap-4"  onSubmit={handleCounselorLogin}>
                            <input 
                            className="p-2 mt-8 rounded-xl border" 
                            type="text"
                            name="email"
                            onChange={(e)=>{setEmail(e.target.value)}} 
                            placeholder="Email"
                            />
                            <div className="relative">
                                <input
                                className="p-2 rounded-xl border w-full"
                                type="password"
                                name="password"
                                onChange={(e)=>{setPassword(e.target.value)}}
                                placeholder="Password"
                                />
                                
                            </div>
                            <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Login</button>
                        </form>

                        {/* <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                            <hr className="border-gray-400" />
                            <p className="text-center text-sm">OR</p>
                            <hr className="border-gray-400" />
                        </div> */}

                        {/* <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
                            <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                            </svg>
                            Login with Google
                        </button> */}

                        <div className="mt-5 text-xs text-center border-t border-[#002D74] py-4 text-[#002D74]">
                            <Link>Forgot your password?</Link>
                        </div>

                        <div className="text-md  text-center py-4 text-[#002D74]">
                            <h2>"Find Ease<br/>Unlock Your Peace"</h2>
                        </div>

                        {/* <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                            <p>Don't have an account?</p>
                            <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Register</button>
                        </div> */}
                    </div>

                    <div className="md:block hidden w-1/2">
                        <img className="rounded-2xl" src="https://www.manomaya.in/assets_web/images/slider/2020-04-04/covid-mobile-banner.jpg" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CounselorLogin
