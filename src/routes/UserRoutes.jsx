import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserProfile from '../Pages/User/UserProfile'
import PageNotFound from '../Pages/PageNotFound'
import PrivateRoutes from '../protectedRoutes/PrivateRoutes'

function UserRoutes() {
    return (
        <div>
            <Routes>
                <Route path='profile/' element={<UserProfile />} />
                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </div>
    )
}

export default UserRoutes
