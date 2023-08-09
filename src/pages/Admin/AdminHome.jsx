import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

function AdminHome() {
  const navigate = useNavigate()
 
  return (
    <div>
       <Helmet>
        <title>Admin Dashboard | MindEase</title>
      </Helmet>
    </div>
  )
}

export default AdminHome
