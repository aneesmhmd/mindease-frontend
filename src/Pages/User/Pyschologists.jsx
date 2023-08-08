import React from 'react'
import PsychologistsCard from '../../Components/User/Psychologists/PsychologistsCard'
import { Helmet } from 'react-helmet'
import image from '../../images/counselors.jpg'

function Pyschologists() {
  return (
    <div className='bg-cover min-h-screen overflow-hidden pt-20' style={{ backgroundImage: `url(${image})` }}>
      <Helmet>
        <title>
          Psychologists | MindEase
        </title>
      </Helmet>
      <PsychologistsCard />
    </div>
  )
}

export default Pyschologists
