import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserProfile from '../Pages/User/UserProfile'
import PageNotFound from '../Pages/PageNotFound'
import Home from '../Pages/User/UserHome'
import UserLayout from '../Pages/User/UserLayout'
import UserPrivateRoutes from '../protectedRoutes/UserPrivateRoutes'

function UserRoutes() {
    return (
        <div className='bg-gray-200 min-h-screen bg-cover'>
            <Routes>
                <Route path='/' element={<UserLayout />}>
                    <Route index element={<Home />} />
                    <Route element={<UserPrivateRoutes/>}>

                        <Route path='profile/' element={<UserProfile />} />
                    </Route>
                </Route>

                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </div>
    )
}

export default UserRoutes
