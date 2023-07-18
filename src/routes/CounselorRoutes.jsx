import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SetPassword from '../Pages/Counselor/SetPassword'

function CounselorRoutes() {
  return (
    <div>
        <Routes>
            <Route path='/set-password/' element={<SetPassword/>}/>
        </Routes>
        
      
    </div>
  )
}

export default CounselorRoutes
