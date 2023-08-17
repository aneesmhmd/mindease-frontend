import React, { useEffect, useState } from "react";
import { decodedToken } from "../Context/auth";
import { isAdminAuth } from "../services/adminApi";
import { Navigate, Outlet } from "react-router-dom";

function AdminPrivateRoutes({ route }) {
  const [verify, setVerify] = useState(null);

  useEffect(() => {
    const decoded = decodedToken("adminJwt");
    if (decoded) {
      isAdminAuth(decoded.id)
        .then((res) => {
          setVerify(res.data.success);
        })
        .catch((err) => {
          setVerify(false);
          localStorage.removeItem("adminJwt");
        });
    }else{
      setVerify(false)
    }
  }, []);

  if(verify===null) return;

  return verify ? <Outlet /> : <Navigate to={route} />;
}

export default AdminPrivateRoutes;
