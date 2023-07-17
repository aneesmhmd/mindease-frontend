import React, { useEffect, useState } from 'react'
import NavbarAdmin from '../../Components/Admin/NavbarAdmin'
import { useNavigate } from 'react-router-dom'
import SideBar from '../../Components/Admin/SideBar'
import BannerOne from '../../Components/User/UserHome/BannerOne'

function AdminHome() {
  const navigate = useNavigate()
  useEffect(()=>{
    document.title = 'Admin Dashboard | MindEase'
  })
  return (
    <div>
      <div>
      <NavbarAdmin/>
      {/* <SideBar/> */}
     
    </div>
    </div>
  )
}

export default AdminHome
