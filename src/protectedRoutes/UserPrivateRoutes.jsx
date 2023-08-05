import React, { useEffect } from 'react'
import { isUserAuth } from '../Services/userApi'
import { Outlet } from 'react-router-dom'

function UserPrivateRoutes() {
  useEffect(() => {
    isUserAuth().then((res) => {
      console.log('Success')
    }).catch((error) => {
      console.log(error);
    })
  }, [])
  
  return <Outlet />
}

export default UserPrivateRoutes
