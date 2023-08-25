import React from 'react'
import { Helmet } from 'react-helmet'
import AppointmentsTable from '../../components/Counselor/Appointments/AppointmentsTable'

export default function CounselorAppointments() {
  return (
    <div className='mt-20'>
        <Helmet>
            <title>Appointments | MindEase</title>
        </Helmet>
        <AppointmentsTable/>
    </div>
  )
}
