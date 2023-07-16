import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './Pages/Authentication/Signup'
import Login from './Pages/Authentication/Login'
import ForgotPassword from './Pages/Authentication/ForgotPassword'
import ResetPassword from './Pages/Authentication/ResetPassword'
import Home from './Pages/User/Home'
import AdminHome from './Pages/Admin/AdminHome'

function App() {

  return (
    <div className='main'>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='login/' element={<Login />} />
          <Route path='register/' element={<Signup/>} />
          <Route path='forgot-password/' element={<ForgotPassword/>} />
          <Route path='reset-password/' element={<ResetPassword/>} />
          <Route path='admin/' element={<AdminHome/>} />
        </Routes>
      </Router>


    </div>
  )
}

export default App
