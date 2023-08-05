import React, { useEffect, useState } from 'react'
import NavbarAdmin from '../../Components/Admin/Home/NavbarAdmin'
import { useNavigate } from 'react-router-dom'
import SideBar from '../../Components/Admin/Home/SideBar'
import BannerOne from '../../Components/User/UserHome/BannerOne'
import { Helmet } from 'react-helmet'

function AdminHome() {
  const navigate = useNavigate()
  useEffect(()=>{
    document.title = 'Admin Dashboard | MindEase'
  })
  return (
    <div>
       <Helmet>
        <title>Admin Dashboard | MindEase</title>
      </Helmet>
    </div>
  )
}

export default AdminHome
