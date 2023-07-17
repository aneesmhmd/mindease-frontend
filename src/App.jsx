import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './Pages/Authentication/Signup'
import Login from './Pages/Authentication/Login'
import ForgotPassword from './Pages/Authentication/ForgotPassword'
import ResetPassword from './Pages/Authentication/ResetPassword'
import Home from './Pages/User/Home'
import PrivateRoutes from './protectedRoutes/PrivateRoutes'
import AdminRoutes from './routes/AdminRoutes'
function App() {

  return (
    <div className='main'>
      <Router>
        <Routes>


          <Route path='login/' element={<Login />} />
          <Route path='/' exact element={<Home />} />
          <Route path='admin/' element/>
          <Route path='register/' element={<Signup />} />
          <Route path='forgot-password/' element={<ForgotPassword />} />
          <Route path='reset-password/' element={<ResetPassword />} />
          <Route path='admin/*' element={<AdminRoutes />} />
        </Routes>
      </Router>


    </div>
  )
}

export default App
