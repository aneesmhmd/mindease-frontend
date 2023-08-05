import React from 'react'
import MainBanner from '../../Components/Counselor/Homepage/MainBanner'
import SubBanners from '../../Components/Counselor/Homepage/SubBanners'
import OurServices from '../../Components/User/UserHome/OurServices'
import { Helmet } from 'react-helmet'

function CounselorHome() {
  return (
    <div className='overflow-hidden mt-14'>
      <Helmet>
        <title>Counselor Home | MindEase</title>
      </Helmet>
      <MainBanner />
      <SubBanners />
      <OurServices />
    </div>
  )
}

export default CounselorHome