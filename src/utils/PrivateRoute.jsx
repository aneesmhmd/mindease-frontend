import React from 'react'
import { Route,Routes, Navigate } from 'react-router-dom'
import Navbar from '../Components/UserNavbar/Navbar'
import Login from '../Pages/Authentication/Login'

const PrivateRoute = ({children, ...rest}) => {
    const authenticated = false
    if(authenticated){
      return <Navbar/>
    }else{
      return <Login/>
    }
}

export default PrivateRoute
