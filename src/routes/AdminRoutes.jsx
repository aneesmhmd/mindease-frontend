import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminHome from '../Pages/Admin/AdminHome'
import AddCounselor from '../Pages/Admin/AddCounselor'
import AdminLogin from '../Pages/Admin/AdminLogin'
import PageNotFound from '../Pages/PageNotFound'
import UsersList from '../Pages/Admin/UsersList'
import AdminLayout from '../Pages/Admin/AdminLayout'
import CounselorsList from '../Pages/Admin/CounselorsList'
import Services from '../Pages/Admin/Services'
import AlertModal from '../Components/Admin/Services/AlertModal'
import adminPrivateRoutes from '../protectedRoutes/adminPrivateRoutes'
import AdminNotifications from '../Pages/Admin/AdminNotifications'
import VerifyEducation from '../Components/Admin/Notifications/VerifyEducation'
import VerifyExperience from '../Components/Admin/Notifications/VerifyExperience'

function AdminRoutes() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<AdminLogin />} />
        <Route path='*' element={<PageNotFound />} />
        <Route path='/' element={<AdminLayout />}>

          <Route path='/dashboard/' element={<AdminHome />} />
          <Route path='/users/' element={<UsersList />} />
          <Route path='/counselors' element={<CounselorsList />} />
          <Route path='/add-counselor/' element={<AddCounselor />} />
          <Route path='/services/' element={<Services />} />
          <Route path='/testimonials/' element={<AlertModal />} />
          <Route path='/notifications/' element={<AdminNotifications />} />
          <Route path='/notifications/verify-education/' element={<VerifyEducation />} />
          <Route path='/notifications/verify-experience/' element={<VerifyExperience />} />
        </Route>

      </Routes>
    </div>
  )
}

export default AdminRoutes
