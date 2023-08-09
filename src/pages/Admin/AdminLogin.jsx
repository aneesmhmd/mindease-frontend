import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { toast } from 'react-toastify'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { adminLogin } from '../../services/adminApi'
import isLogged, { getLocal } from '../../Context/auth'

function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        document.title = 'Admin Login'
        const response = isLogged('adminJwt')
        if(response && response == 'admin'){
            navigate('/admin/dashboard')
        }
    }, [navigate])



    // Email validation function
    const isValidEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    const handleAdminLogin = async (e) => {
        e.preventDefault();
        if (email.trim() === '') {
            toast.error('Enter email')
        } else if (!isValidEmail(email.trim())) {
            toast.warn('Enter a valid email')
        } else if (password.trim === '') {
            toast.error('Enter your password')
        } else {
            try{
                adminLogin({email, password}).then((res)=>{
                    if(res.status===200){
                        localStorage.setItem('adminJwt', JSON.stringify(res.data.token))
                        toast.success('Login succesfull')
                        navigate('/admin/dashboard')
                    }
                }).catch((error)=>{
                    toast.error(error.response.data.message)
                    if(error.response.status===401){
                        navigate('/login')
                    }
                })
            }catch(error){
                toast.error('An error occured.Please try again')
            }
        }
    }
    return (
        <div>
            <Helmet>
                <title>Admin Login</title>
            </Helmet>

            <section className="bg-gray-300 min-h-screen flex items-center justify-center">
                <div className="bg-gray-50 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
                    <div className="md:w-1/2 px-8 md:px-16">
                        <h1 className="font-bold font-sans text-2xl text-[#002D74] mb-5">MindEase</h1>
                        <h2 className="font-medium text-2xl text-[#002D74]">Admin Login</h2>
                        <p className="text-xs mt-4 text-[#002D74]">Login to your account as admin</p>

                        <form className="flex flex-col gap-4" onSubmit={handleAdminLogin}>
                            <input
                                className="p-2 mt-8 rounded-xl border"
                                type="text"
                                name="email"
                                onChange={(e) => { setEmail(e.target.value) }}
                                placeholder="Email"
                            />
                            <div className="relative">
                                <input
                                    className="p-2 rounded-xl border w-full"
                                    type="password"
                                    name="password"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    placeholder="Password"
                                />

                            </div>
                            <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300" type='submit'>Login</button>
                        </form>


                        <div className="mt-5 text-xs text-center border-t border-[#002D74] py-4 text-[#002D74]">
                            <Link>Forgot your password?</Link>
                        </div>

                        <div className="text-md  text-center py-4 text-[#002D74]">
                            <h2>"Find Ease<br />Unlock Your Peace"</h2>
                        </div>

                    </div>

                    <div className="md:block hidden w-1/2">
                        <img className="rounded-2xl" src="https://tandsgo.com/wp-content/uploads/2016/12/LinkedIn-Company-Page-admin-working-on-computer.png" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AdminLogin