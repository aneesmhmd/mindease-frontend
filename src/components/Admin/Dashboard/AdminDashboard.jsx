import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { adminDashboard } from "../../../services/adminApi";

export default function AdminDashboard() {
  const [counts,setCounts] = useState({})

  useEffect(()=>{
    getCounts();
  },[])

  const getCounts = async () =>{
    await adminDashboard().then((res)=>{
      setCounts(res.data)
    }).catch((err)=>{
      console.log(err);
    })
  }
  return (
    <div className="flex flex-col justify-center items-center w-full mt-10 gap-10">
      <div className="flex flex-row w-full justify-center gap-10">
        <div className="flex flex-col bg-blue-50 w-56 h-40 rounded-3xl items-center justify-center shadow-lg">
          <Typography variant="h6">Users</Typography>
          <h1 className="text-6xl">{counts?.users}</h1>
        </div>

        <div className="flex flex-col bg-blue-50 w-56 h-40 rounded-3xl items-center justify-center shadow-lg">
          <Typography variant="h6">Counselors</Typography>
          <h1 className="text-6xl">{counts?.counselors}</h1>
        </div>

        <div className="flex flex-col bg-blue-50 w-56 h-40 rounded-3xl items-center justify-center shadow-lg">
          <Typography variant="h6">Servies</Typography>
          <h1 className="text-6xl">{counts?.services}</h1>
        </div>
      </div>

      <div className="flex flex-row w-full justify-center gap-10">
        <div className="flex flex-col bg-blue-50 w-56 h-40 rounded-3xl items-center justify-center shadow-lg">
          <Typography variant="h6">Tasks</Typography>
          <h1 className="text-6xl">{counts?.tasks}</h1>
        </div>

        <div className="flex flex-col bg-blue-50 w-56 h-40 rounded-3xl items-center justify-center shadow-lg">
          <Typography variant="h6">Subscriptions</Typography>
          <h1 className="text-6xl">{counts?.subscriptions}</h1>
        </div>

        <div className="flex flex-col bg-blue-50 w-56 h-40 rounded-3xl items-center justify-center shadow-lg">
          <Typography variant="h6">Appointments</Typography>
          <h1 className="text-6xl">{counts?.appointments}</h1>
        </div>
      </div>

      <div className="flex flex-row w-full justify-center gap-16"></div>
    </div>
  );
}
