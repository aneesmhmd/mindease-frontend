import React from 'react'
import { Helmet } from 'react-helmet'
import SlotsTable from '../../components/Counselor/Slots/SlotsTable'

function CounselorSlots() {
  return (
    <div>
      <Helmet>
        <title>Your slots | MindEase</title>
      </Helmet>
      <SlotsTable/>
    </div>
  )
}

export default CounselorSlots
