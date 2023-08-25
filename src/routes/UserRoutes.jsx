import React from "react";
import { Route, Routes } from "react-router-dom";
import UserProfile from "../pages/User/UserProfile";
import PageNotFound from "../pages/PageNotFound";
import Home from "../pages/User/UserHome";
import UserLayout from "../pages/User/UserLayout";
import UserPrivateRoutes from "../protectedRoutes/UserPrivateRoutes";
import Pyschologists from "../pages/User/Pyschologists";
import PsychologicalTasks from "../pages/User/PsychologicalTasks";
import ContactUs from "../pages/User/ContactUs";
import PsychologistProfile from "../pages/User/PsychologistProfile";
import SubscribePage from "../components/User/PsychologicalTasks/SubscribePage";
import PaymentSuccess from "../components/User/PsychologicalTasks/PaymentSuccess";
import TaskItems from "../components/User/Profile/SubscribedTasks/TaskItems";
import SlotBooking from "../components/User/Booking/SlotBooking";
import BookingSuccess from "../components/User/Booking/BookingSuccess";
import Session from "../pages/User/Session";
import Reschedule from "../components/User/Booking/Reschedule";

function UserRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="psychologists/" element={<Pyschologists />} />
          <Route path="psychologist-profile/" element={<PsychologistProfile />} />
          <Route path="psychological-tasks/" element={<PsychologicalTasks />} />
          <Route path="contact-us/" element={<ContactUs />} />
          
          <Route element={<UserPrivateRoutes route={"/login"} />}>
            <Route path="psychologist/book-slot/" element={<SlotBooking />} />
            <Route path="task-payment-success/" element={<PaymentSuccess />} />
            <Route path="booking-payment-success/" element={<BookingSuccess />} />
            <Route path="profile/" element={<UserProfile />} />
            <Route path="subscribe-task/" element={<SubscribePage />} />
            <Route path="view-task/" element={<TaskItems />} />
            <Route path="session/" element={<Session />} />
            <Route path="session-reschedule/" element={<Reschedule />} />
          </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default UserRoutes;
