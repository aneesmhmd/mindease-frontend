import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserProfile from '../pages/User/UserProfile'
import PageNotFound from '../pages/PageNotFound'
import Home from '../pages/User/UserHome'
import UserLayout from '../pages/User/UserLayout'
import UserPrivateRoutes from '../protectedRoutes/UserPrivateRoutes'
import Pyschologists from '../pages/User/Pyschologists'
import PsychologicalTasks from '../pages/User/PsychologicalTasks'
import ContactUs from '../pages/User/ContactUs'
import PsychologistProfile from '../pages/User/PsychologistProfile'

function UserRoutes() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<UserLayout />}>
                    <Route index element={<Home />} />
                    <Route element={<UserPrivateRoutes />}>

                        <Route path='profile/' element={<UserProfile />} />
                        <Route path='psychologists/' element={<Pyschologists />} />
                        <Route path='view/psychologist/' element={<PsychologistProfile />} />
                        <Route path='psychological-tasks/' element={<PsychologicalTasks />} />
                        <Route path='contact-us/' element={<ContactUs />} />
                    </Route>
                </Route>

                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </div>
    )
}

export default UserRoutes
