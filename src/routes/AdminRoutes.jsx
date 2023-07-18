import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminHome from '../Pages/Admin/AdminHome'
import AddCounselor from '../Pages/Admin/AddCounselor'
import PrivateRoutes from '../protectedRoutes/PrivateRoutes'
PrivateRoutes


function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/dashboard/' element={<AdminHome/>}/>
        <Route path='/add-counselor/' element={<AddCounselor />} />

      </Routes>
    </div>
  )
}

export default AdminRoutes
