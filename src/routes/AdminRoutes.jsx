import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminHome from '../pages/Admin/AdminHome'
import AddCounselor from '../pages/Admin/AddCounselor'
import AdminLogin from '../pages/Admin/AdminLogin'
import PageNotFound from '../pages/PageNotFound'
import UsersList from '../pages/Admin/UsersList'
import AdminLayout from '../pages/Admin/AdminLayout'
import CounselorsList from '../pages/Admin/CounselorsList'
import Services from '../pages/Admin/Services'
import AlertModal from '../components/Admin/Services/AlertModal'
import adminPrivateRoutes from '../protectedRoutes/adminPrivateRoutes'
import AdminNotifications from '../pages/Admin/AdminNotifications'
import VerifyEducation from '../components/Admin/Notifications/VerifyEducation'
import VerifyExperience from '../components/Admin/Notifications/VerifyExperience'
import PsychologicalTasks from '../pages/Admin/PsychologicalTasks'
import AddTasks from '../components/Admin/Tasks/AddTasks'
import ViewTasks from '../components/Admin/Tasks/ViewTasks'
import AddTaskItem from '../components/Admin/Tasks/AddTaskItem'
import AdminProfile from '../pages/Admin/AdminProfile'

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
          <Route path='/psychological-tasks/' element={<PsychologicalTasks />} />
          <Route path='/psychological-tasks/add' element={<AddTasks />} />
          <Route path='/view-tasks' element={<ViewTasks />} />
          <Route path='add-task-activity/' element={<AddTaskItem />} />
          <Route path='/Services/' element={<Services />} />
          <Route path='/testimonials/' element={<AlertModal />} />
          <Route path='/notifications/' element={<AdminNotifications />} />
          <Route path='/notifications/verify-education/' element={<VerifyEducation />} />
          <Route path='/notifications/verify-experience/' element={<VerifyExperience />} />
          <Route path='/profile/' element={<AdminProfile />} />
        </Route>

      </Routes>
    </div>
  )
}

export default AdminRoutes
