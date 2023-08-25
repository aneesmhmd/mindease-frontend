import React from 'react'
import { Helmet } from 'react-helmet'
import SessionPage from '../../components/User/Session/SessionPage'

function Session() {
  return (
    <div className='flex flex-col justify-center pt-16 min-h-screen'>
      <Helmet>
        <title>Session | MindEase</title>
      </Helmet>
      <SessionPage/>
    </div>
  )
}

export default Session
