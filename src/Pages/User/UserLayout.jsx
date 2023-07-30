import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../Components/UserNavbar/UserNavBar'

function UserLayout() {
    return (
        <div>
            <div className='pb-20'>
                <NavBar />
            </div>
            <div>
                <Outlet/>
            </div>

        </div>
    )
}

export default UserLayout
