import React from 'react'
import { Helmet } from 'react-helmet'
import CounselorPro from '../../Components/Counselor/Profile/CounselorPro'
import counselorProfile from '../../images/counselor.jpg'

function CounselorProfile() {
  return (
    <div className='bg-cover min-h-screen bg-blur' style={{ backgroundImage: `url(${counselorProfile})` }}>
      <Helmet>
        <title>My Profile | MindEase</title>
      </Helmet>
      <CounselorPro/>
    </div>
  )
}

export default CounselorProfile
