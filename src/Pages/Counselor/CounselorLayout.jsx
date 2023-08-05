import React from 'react'
import NavbarCounselor from '../../Components/Counselor/Navbar/NavbarCounselor'
import { Outlet } from 'react-router-dom'
function CounselorLayout() {
    return (
        <div>
            <div className='flex'>
                <NavbarCounselor />
            </div>
            <div>
                {<Outlet />}
            </div>
        </div>
    )
}

export default CounselorLayout
