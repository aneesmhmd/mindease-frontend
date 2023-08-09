import React from 'react'
import { Helmet } from 'react-helmet'
import ViewProfile from '../../components/User/Psychologists/ViewProfile'

function PsychologistProfile() {
  return (
    <div>
      <Helmet>
        <title>
          View Profile | MindEase
        </title>
      </Helmet>
      <ViewProfile/>
    </div>
  )
}

export default PsychologistProfile
