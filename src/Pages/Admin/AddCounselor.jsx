import React, { useEffect } from 'react'
import NavBar from '../../Components/Admin/Home/NavbarAdmin'
import AddForm from '../../Components/Admin/AddCounselor/AddForm'
import SideBar from '../../Components/Admin/Home/SideBar'

function AddCounselor() {
  useEffect(() => {
    document.title = 'Add Counselor | Admin'
  }, [])
  return (
    <div>
      <NavBar />
      <div className='flex' >
        <div className='1/4'>
          <SideBar />
        </div>
        <div className='flex justify-center w-full '>
          <AddForm />
        </div>

      </div>

    </div>
  )
}

export default AddCounselor
