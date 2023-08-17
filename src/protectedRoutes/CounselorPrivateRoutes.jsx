import React, { useEffect, useState } from "react";
import { decodedToken } from "../Context/auth";
import { isCounselorAuth } from "../services/counselorApi";
import { Navigate, Outlet } from "react-router-dom";

function CounselorPrivateRoutes({ route }) {
  const [verify, setVerify] = useState(null);

  useEffect(() => {
    const decoded = decodedToken("counselorJwt");
    if (decoded) {
      isCounselorAuth(decoded.id)
        .then((res) => {
          setVerify(res.data.success);
        })
        .catch((err) => {
          setVerify(false);
          localStorage.removeItem("counselorJwt");
        });
    }else{
      setVerify(false)
    }
  }, []);

  if (verify === null) return;

  return verify ? <Outlet /> : <Navigate to={route} />;
}

export default CounselorPrivateRoutes;
