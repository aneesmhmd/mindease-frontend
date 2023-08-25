import React from 'react'
import { Helmet } from 'react-helmet'
import AppointmentsList from '../../components/Admin/Appointments/AppointmentsList'

function Appointments() {
  return (
    <div>
      <Helmet>
        <title>Appointments | MindEase</title>
      </Helmet>
      <AppointmentsList/>
    </div>
  )
}

export default Appointments
