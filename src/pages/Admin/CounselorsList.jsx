import React from 'react'
import ListTable from '../../components/Admin/CounselorsList/CounselorsList'
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
