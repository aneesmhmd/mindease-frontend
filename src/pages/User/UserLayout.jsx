import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../components/UserNavbar/UserNavBar'

function UserLayout() {
    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div>
                <Outlet/>
            </div>

        </div>
    )
}

export default UserLayout
