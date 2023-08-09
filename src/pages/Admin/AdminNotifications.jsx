import React from 'react'
import { Helmet } from 'react-helmet'
import EducationNotification from '../../components/Admin/Notifications/EducationNotification'
import ExperienceNotification from '../../components/Admin/Notifications/ExperienceNotification'

function AdminNotifications() {
  return (
    <div>
        <Helmet>
            <title>
                Admin Notifications | MindEase
            </title>
        </Helmet>
        <div className='flex flex-col gap-16 mt-10 w-full min-h-screen'>
            <EducationNotification/>
            <ExperienceNotification/>
        </div>
    </div>
  )
}

export default AdminNotifications
