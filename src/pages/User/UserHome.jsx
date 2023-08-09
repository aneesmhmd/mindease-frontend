import React, { useEffect } from 'react'
import NavBar from '../../components/UserNavbar/UserNavBar'
import BannerOne from '../../components/User/UserHome/BannerOne'
import BannerTwo from '../../components/User/UserHome/BannerTwo'
import OurServices from '../../components/User/UserHome/OurServices'

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
