import React, { useEffect } from 'react'
import NavBar from '../../Components/Admin/NavbarAdmin'
import AddForm from '../../Components/Admin/AddCounselor/AddForm'

function AddCounselor() {
  useEffect(()=>{
    document.title = 'Add Counselor | Admin'
  },[])
  return (
    <div>
      <NavBar/>
      <AddForm/>
      
    </div>
  )
}

export default AddCounselor
