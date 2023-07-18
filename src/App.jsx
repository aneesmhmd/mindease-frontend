import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './Pages/Authentication/Signup'
import Login from './Pages/Authentication/Login'
import ForgotPassword from './Pages/Authentication/ForgotPassword'
import ResetPassword from './Pages/Authentication/ResetPassword'
import Home from './Pages/User/Home'
import AdminRoutes from './routes/AdminRoutes'
import CounselorRoutes from './routes/CounselorRoutes'

function App() {

  return (
    <div className='main'>
      <Router>
        <Routes>

          <Route path='/' exact element={<Home />} />
          <Route path='login/' element={<Login />} />
          <Route path='counselor/*' element={<CounselorRoutes/>}/>
          <Route path='admin/*' element={<AdminRoutes />} />
          <Route path='admin/' element/>
          <Route path='register/' element={<Signup />} />
          <Route path='forgot-password/' element={<ForgotPassword />} />
          <Route path='reset-password/' element={<ResetPassword />} />
          
        </Routes>
      </Router>


    </div>
  )
}

export default App
