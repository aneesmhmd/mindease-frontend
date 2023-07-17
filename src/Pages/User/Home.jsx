import React, { useEffect } from 'react'
import NavBar from '../../Components/UserNavbar/Navbar'
import BannerOne from '../../Components/User/UserHome/BannerOne'
import BannerTwo from '../../Components/User/UserHome/BannerTwo'
import OurServices from '../../Components/User/UserHome/OurServices'

function Home() {
  useEffect(()=>{
    document.title = 'MindEase'
  })
  return (
    <div>
      <div className='pb-20'>
      <NavBar/>
      </div>
      <div>
      <BannerOne/>
      <BannerTwo/>
      <OurServices/>
      </div>
    </div>
  )
}

export default Home
