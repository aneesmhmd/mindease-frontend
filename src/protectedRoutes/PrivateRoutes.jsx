import React, { useEffect, useState } from 'react';
import { isAuth } from '../Services/authApi';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import UserLogin from '../Pages/Authentication/UserLogin';
export default function PrivateRoutes({ role, route }) {
  const [verify, setVerify] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    if (role === 'user') {
      isAuth()
        .then((response) => {
          if (response.role === 'admin'){
            setVerify(true)
            console.log('Verified state',verify);
          }else{
            setVerify(false)
            console.log('Verified state',verify);

          }
        })
        .catch((err) => {
          console.log(err, "error ioo");
        });
    }
  }, []);

  if (verify === null) return null; // Return null while verifying

  return verify ? <Outlet /> : <Navigate to={route} />;
}
