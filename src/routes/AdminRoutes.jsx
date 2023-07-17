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
        <Route element={<PrivateRoutes role={'user'} route={'/'}/>} >
        <Route path='/dashboard' element={<AdminHome/>}/>
        <Route path='add-counselor/' element={<AddCounselor />} />

        </Route>
      </Routes>
    </div>
  )
}

export default AdminRoutes
