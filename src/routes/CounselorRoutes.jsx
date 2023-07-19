import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SetPassword from '../Pages/Counselor/SetPassword'
import CounselorLogin from '../Pages/Counselor/CounselorLogin'

function CounselorRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/login/' element={<CounselorLogin/>}/>
            <Route path='/set-password/' element={<SetPassword/>}/>
        </Routes>
        
      
    </div>
  )
}

export default CounselorRoutes
