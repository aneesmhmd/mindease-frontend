import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CounselorLayout from '../Pages/Counselor/CounselorLayout'
import SetPassword from '../Pages/Counselor/SetPassword'
import CounselorLogin from '../Pages/Counselor/CounselorLogin'
import CounselorHome from '../Pages/Counselor/CounselorHome'
import CounselorProfile from '../Pages/Counselor/CounselorProfile'
import PageNotFound from '../Pages/PageNotFound'
import counselorPrivateRoutes from '../protectedRoutes/counselorPrivateRoutes'
import CounselorAddEducation from '../Pages/Counselor/CounselorAddEducation'
import CounselorAddExperience from '../Components/Counselor/Profile/CounselorAddExperience'

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
