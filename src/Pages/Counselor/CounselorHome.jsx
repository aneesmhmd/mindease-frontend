import React from 'react'
import MainBanner from '../../Components/Counselor/Homepage/MainBanner'
import SubBanners from '../../Components/Counselor/Homepage/SubBanners'
import OurServices from '../../Components/User/UserHome/OurServices'

function CounselorHome() {
  return (
    <div>
      <MainBanner/>
      <SubBanners/>
      <OurServices/>
    </div>
  )
}

export default CounselorHome