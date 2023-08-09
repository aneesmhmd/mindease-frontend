import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {counselorLogin} from '../../services/counselorApi'
import isLogged from '../../Context/auth'

function CounselorLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');

    useEffect(() => {
        document.title = 'Counselor Login | MindEase'
        if (message) {
            toast.success(message)
        }
        const response = isLogged('counselorJwt');
        if (response && response === 'counselor') {
            navigate('/counselor/home')
        }
    }, [navigate])


    const handleCounselorLogin = async (e) => {
        e.preventDefault(); // Prevents the form submission

        if (email.trim() === '') {
            toast.error('Enter email');
        } else if (!isValidEmail(email.trim())) {
            toast.warn('Enter a valid email');
        } else if (password.trim() === '') {
            toast.error('Enter password');
        } else {
            try {
                counselorLogin({email, password}).then((res) => {
                    if (res.status === 200) {
                        localStorage.setItem('counselorJwt', JSON.stringify(res.data.token))
                        toast.success(res.data.message)
                        navigate('/counselor/home')
                    }
                }).catch((error) => {

                    toast.error(error.response.data.message)
                    if (error.response.status === 401) {
                        navigate('/login')
                    }
                })
            } catch (error) {
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

                        <form className="flex flex-col gap-4"
                            onSubmit={handleCounselorLogin}>
                            <input className="p-2 mt-8 rounded-xl border" type="text" name="email"
                                onChange={
                                    (e) => {
                                        setEmail(e.target.value)
                                    }
                                }
                                placeholder="Email"/>
                            <div className="relative">
                                <input className="p-2 rounded-xl border w-full" type="password" name="password"
                                    onChange={
                                        (e) => {
                                            setPassword(e.target.value)
                                        }
                                    }
                                    placeholder="Password"/>

                            </div>
                        <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Login</button>
                    </form>

                    <div className="mt-5 text-xs text-center border-t border-[#002D74] py-4 text-[#002D74]">
                        <Link to='/forgot-password'>Forgot your password?</Link>
                    </div>

                    <div className="text-md  text-center py-4 text-[#002D74]">
                        <h2>"Find Ease<br/>Unlock Your Peace"</h2>
                    </div>
                </div>

                <div className="md:block hidden w-1/2">
                    <img className="rounded-2xl" src="https://www.manomaya.in/assets_web/images/slider/2020-04-04/covid-mobile-banner.jpg"/>
                </div>
            </div>
        </section>
    </div>
    )
}

export default CounselorLogin
