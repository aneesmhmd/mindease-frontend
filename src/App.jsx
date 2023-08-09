import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './pages/Authentication/Signup'
import UserLogin from './pages/Authentication/UserLogin'
import ForgotPassword from './pages/Authentication/ForgotPassword'
import ResetPassword from './pages/Authentication/ResetPassword'
import AdminRoutes from './routes/AdminRoutes'
import CounselorRoutes from './routes/CounselorRoutes'
import UserRoutes from './routes/UserRoutes'

function App() {

  return (
    <div className='main'>
      <Router>
        <Routes>

          <Route path='/*' element={<UserRoutes />} />
          <Route path='login/' element={<UserLogin />} />
          <Route path='register/' element={<Signup />} />
          <Route path='forgot-password/' element={<ForgotPassword />} />
          <Route path='reset-password/' element={<ResetPassword />} />

          <Route path='counselor/*' element={<CounselorRoutes/>}/>
          <Route path='admin/*' element={<AdminRoutes />} />
         
          
        </Routes>
      </Router>


    </div>
  )
}

export default App
