import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import AdminDashboard from '../../components/Admin/Dashboard/AdminDashboard'

function AdminHome() {
  const navigate = useNavigate()
 
  return (
    <div>
       <Helmet>
        <title>Admin Dashboard | MindEase</title>
      </Helmet>
      <AdminDashboard/>
    </div>
  )
}

export default AdminHome
