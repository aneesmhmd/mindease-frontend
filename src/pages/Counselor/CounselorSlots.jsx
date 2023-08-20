import React from 'react'
import { Helmet } from 'react-helmet'
import SlotsPage from '../../components/Counselor/Slots/SlotsPage'

function CounselorSlots() {
  return (
    <div>
      <Helmet>
        <title>Your slots | MindEase</title>
      </Helmet>
      <SlotsPage/>
    </div>
  )
}

export default CounselorSlots
