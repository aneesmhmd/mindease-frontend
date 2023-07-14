import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './Pages/Authentication/Signup'
import Login from './Pages/Authentication/Login'
import ForgotPassword from './Pages/Authentication/ForgotPassword'
import ResetPassword from './Pages/Authentication/ResetPassword'
import PrivateRoute from './utils/PrivateRoute'
import Home from './Pages/User/Home'

function App() {

  return (
    <div className='main'>
      <Router>
        <Routes>
          <Route path='/' exact Component={Home}/>
          <Route path='login/' Component={Login}/>
          <Route path='register/' Component={Signup}/>
          <Route path='forgot-password/' Component={ForgotPassword}/>
          <Route path='reset-password/' Component={ResetPassword}/>
        </Routes>
      </Router>
      
  
  </div>
  )
}

export default App
