import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SetPassword from '../Pages/Counselor/SetPassword'
import CounselorLogin from '../Pages/Counselor/CounselorLogin'
import CounselorHome from '../Pages/Counselor/CounselorHome'
import PageNotFound from '../Pages/PageNotFound'
import CounselorLayout from '../Pages/Counselor/CounselorLayout'
import PrivateRoutes from '../protectedRoutes/PrivateRoutes'


function CounselorRoutes() {
  return (
    <div>
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route path='/login/' element={<CounselorLogin />} />
        <Route path='/' element={<CounselorLayout />}>
          {/* <Route element={<PrivateRoutes role='counselor' route={'counselor/login'}/>}> */}
          <Route path='/home/' element={<CounselorHome />} />
          <Route path='/set-password/' element={<SetPassword />} />
        </Route>


      </Routes>


    </div>
  )
}

export default CounselorRoutes
