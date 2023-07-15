import React, { useEffect, useState } from 'react'
import NavbarAdmin from '../../Components/Admin/NavbarAdmin'
import { useNavigate } from 'react-router-dom'


function AdminHome() {
  const history = useNavigate()
  useEffect(()=>{
    document.title = 'Admin Dashboard | MindEase'
  })
  return (
    <div>
      <div>
      <NavbarAdmin/>
     
    </div>
    </div>
  )
}

export default AdminHome
