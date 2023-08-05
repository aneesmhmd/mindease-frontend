import React from 'react'
import NavBar from '../../Components/Admin/Home/NavbarAdmin'
import SideBar from '../../Components/Admin/Home/SideBar'
import ListTable from '../../Components/Admin/CounselorsList/CounselorsList'
import { Helmet } from 'react-helmet'

function CounselorsList() {
    return (
        <div >
            <Helmet>
                <title>Counselors List | MindEase</title>
            </Helmet>
            <h1 className='font-medium md:text-xl ms-2'>Counselors</h1>
            <ListTable />
        </div>
    )
}

export default CounselorsList
