import React from "react";
import { Route, Routes } from "react-router-dom";
import CounselorLayout from "../pages/Counselor/CounselorLayout";
import SetPassword from "../pages/Counselor/SetPassword";
import CounselorLogin from "../pages/Counselor/CounselorLogin";
import CounselorHome from "../pages/Counselor/CounselorHome";
import CounselorProfile from "../pages/Counselor/CounselorProfile";
import PageNotFound from "../pages/PageNotFound";
import CounselorPrivateRoutes from "../protectedRoutes/CounselorPrivateRoutes";
import CounselorAddEducation from "../pages/Counselor/CounselorAddEducation";
import CounselorAddExperience from "../components/Counselor/Profile/CounselorAddExperience";
import CounselorSlots from "../pages/Counselor/CounselorSlots";
import AddSlots from '../components/Counselor/Slots/AddSlots'
import CounselorAppointments from "../pages/Counselor/CounselorAppointments";
import VideoCall from "../components/VideoCall/VideoCall";

function CounselorRoutes() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/login/" element={<CounselorLogin />} />
        <Route path="/" element={<CounselorLayout />}>
          <Route element={<CounselorPrivateRoutes route={"/counselor/login/"} />}>
            <Route path="/home/" element={<CounselorHome />} />
            <Route path="/appointments/" element={<CounselorAppointments />} />
            <Route path="/slots/" element={<CounselorSlots />} />
            <Route path="/slots/add-slots/" element={<AddSlots/>}/>
            <Route path="/profile/" element={<CounselorProfile />} />
            <Route path="/set-password/" element={<SetPassword />} />
            <Route path="/add-qualification/" element={<CounselorAddEducation />}/>
            <Route path="/add-experience/" element={<CounselorAddExperience />} />
            <Route path="/session" element={<VideoCall/>}/>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default CounselorRoutes;
