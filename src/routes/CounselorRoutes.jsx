import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CounselorLayout from '../pages/Counselor/CounselorLayout'
import SetPassword from '../pages/Counselor/SetPassword'
import CounselorLogin from '../pages/Counselor/CounselorLogin'
import CounselorHome from '../pages/Counselor/CounselorHome'
import CounselorProfile from '../pages/Counselor/CounselorProfile'
import PageNotFound from '../pages/PageNotFound'
import counselorPrivateRoutes from '../protectedRoutes/counselorPrivateRoutes'
import CounselorAddEducation from '../pages/Counselor/CounselorAddEducation'
import CounselorAddExperience from '../components/Counselor/Profile/CounselorAddExperience'

function CounselorRoutes() {
  return (
    <div>
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route path='/login/' element={<CounselorLogin />} />
        <Route path='/' element={<CounselorLayout />}>
          <Route path='/home/' element={<CounselorHome />} />
          <Route path='/profile/' element={<CounselorProfile />} />
          <Route path='/set-password/' element={<SetPassword />} />
          <Route path='/add-qualification/' element={<CounselorAddEducation />} />
          <Route path='/add-experience/' element={<CounselorAddExperience />} />
        </Route>


      </Routes>


    </div>
  )
}

export default CounselorRoutes
