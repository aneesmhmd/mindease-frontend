import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserProfile from '../Pages/User/UserProfile'
import PageNotFound from '../Pages/PageNotFound'
import Home from '../Pages/User/UserHome'
import UserLayout from '../Pages/User/UserLayout'
import UserPrivateRoutes from '../protectedRoutes/UserPrivateRoutes'
import Pyschologists from '../Pages/User/Pyschologists'
import PsychologicalTasks from '../Pages/User/PsychologicalTasks'
import ContactUs from '../Pages/User/ContactUs'

function UserRoutes() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<UserLayout />}>
                    <Route index element={<Home />} />
                    <Route element={<UserPrivateRoutes/>}>

                        <Route path='profile/' element={<UserProfile />} />
                        <Route path='psychologists/' element={<Pyschologists />} />
                        <Route path='psychological-tasks/' element={<PsychologicalTasks/>} />
                        <Route path='contact-us/' element={<ContactUs/>} />
                    </Route>
                </Route>

                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </div>
    )
}

export default UserRoutes
