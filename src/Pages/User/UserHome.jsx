import React, { useEffect } from 'react'
import NavBar from '../../Components/UserNavbar/UserNavBar'
import BannerOne from '../../Components/User/UserHome/BannerOne'
import BannerTwo from '../../Components/User/UserHome/BannerTwo'
import OurServices from '../../Components/User/UserHome/OurServices'

function Home() {
  useEffect(() => {
    document.title = 'MindEase'
  })
  return (
    <div className='min-h-screen pt-16 bg-gray-100'>
      <BannerOne />
      <BannerTwo />
      <OurServices />
    </div>
  )
}

export default Home
