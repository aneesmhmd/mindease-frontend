import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminHome from '../Pages/Admin/AdminHome'
import AddCounselor from '../Pages/Admin/AddCounselor'
import PrivateRoutes from '../protectedRoutes/PrivateRoutes'
import AdminLogin from '../Pages/Admin/AdminLogin'
import PageNotFound from '../Pages/PageNotFound'
import UsersList from '../Pages/Admin/UsersList'


function AdminRoutes() {
  return (
    <div>
      <Routes>
          <Route path='/login' element={<AdminLogin/>}/>
        {/* <Route element={<PrivateRoutes role='admin' route={'/admin/login'} />}> */}
          <Route path='*' element={<PageNotFound />} />
          <Route path='/dashboard/' element={<AdminHome />} />
          <Route path='/users/' element={<UsersList/>}/>
          <Route path='/add-counselor/' element={<AddCounselor />} />
        {/* </Route> */}

      </Routes>
    </div>
  )
}

export default AdminRoutes
