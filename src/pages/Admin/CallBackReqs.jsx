import React from 'react'
import ReqsTable from '../../components/Admin/CallBackReqs/ReqsTable'
import { Helmet } from 'react-helmet'

function CallBackReqs() {
  return (
    <div>
      <Helmet>
        <title>
          CallBack Requests | MindEase
        </title>
      </Helmet>
      <ReqsTable/>
    </div>
  )
}

export default CallBackReqs
