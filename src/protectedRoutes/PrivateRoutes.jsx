import React, { useEffect, useState } from 'react';
import { isAuth } from '../Services/authApi';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import UserLogin from '../Pages/Authentication/UserLogin';


export default function PrivateRoutes({ role, route }) {
  const [verify, setVerify] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {

  });

  if (verify === null) return null; // Return null while verifying

  return verify ? <Outlet /> : <Navigate to={route} />;
}
