import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserProfile from '../Pages/User/UserProfile'

function UserRoutes() {
    return (
        <div>
            <Routes>
                <Route path='profile/' element={<UserProfile />} />
            </Routes>
        </div>
    )
}

export default UserRoutes
