import React from 'react'
import {
    Tooltip,
    IconButton
} from '@material-tailwind/react'
import CounselorTabs from './CounselorTabs'
import ProfileCard from './ProfileCard'

function CounselorPro() {
    return (
        <div className='flex flex-col align-middle items-center'>

            <div className='flex flex-col align-middle items-center w-full mt-12'>
                <ProfileCard />
            </div>
            <div className='flex mt-7 mb-6 rounded-b-xl w-3/4 bg-opacity-95'>
                <div className='w-full'>
                    <CounselorTabs />
                </div>
            </div>





        </div>
    )
}

export default CounselorPro
