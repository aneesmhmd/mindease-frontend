import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './Pages/Authentication/Signup'
import UserLogin from './Pages/Authentication/UserLogin'
import ForgotPassword from './Pages/Authentication/ForgotPassword'
import ResetPassword from './Pages/Authentication/ResetPassword'
import Home from './Pages/User/UserHome'
import AdminRoutes from './routes/AdminRoutes'
import CounselorRoutes from './routes/CounselorRoutes'
import UserProfile from './Pages/User/UserProfile'
import UserRoutes from './routes/UserRoutes'
import PageNotFound from './Pages/User/PageNotFound'

function App() {

  return (
    <div className='main'>
      <Router>
        <Routes>

          <Route path='/' exact element={<Home />} />
          <Route path='/*' element={<UserRoutes />} />
          <Route path='login/' element={<UserLogin />} />
          <Route path='register/' element={<Signup />} />
          <Route path='forgot-password/' element={<ForgotPassword />} />

          <Route path='counselor/*' element={<CounselorRoutes/>}/>
          <Route path='admin/*' element={<AdminRoutes />} />
          <Route path='user/*' element={<UserRoutes/>}/>
         
          <Route path='reset-password/' element={<ResetPassword />} />
          
        </Routes>
      </Router>


    </div>
  )
}

export default App
