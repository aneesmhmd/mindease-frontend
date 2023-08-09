import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../../components/Admin/Home/NavbarAdmin'
import SideBar from '../../components/Admin/Home/SideBar'

function AdminLayout() {
  return (
    <div>
      <NavBar />
      <div className='flex ' >
        <div className='1/4'>
          <SideBar />
        </div>
        <div className='mt-24 ms-32 w-5/6'>
          {<Outlet />}
        </div>

      </div>

    </div>
  )
}

export default AdminLayout
