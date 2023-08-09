import React from 'react'
import { Helmet } from 'react-helmet'
import ProfilePageAdmin from '../../components/Admin/Profile/ProfilePageAdmin'

function AdminProfile() {
  return (
    <div>
      <Helmet>
        <title>
            My Profile | MindEase
        </title>
      </Helmet>
      <ProfilePageAdmin/>
    </div>
  )
}

export default AdminProfile
