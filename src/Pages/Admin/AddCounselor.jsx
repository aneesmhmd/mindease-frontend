import NavBar from '../../Components/Admin/Home/NavbarAdmin'
import AddForm from '../../Components/Admin/AddCounselor/AddForm'
import SideBar from '../../Components/Admin/Home/SideBar'
import { Helmet } from 'react-helmet'

function AddCounselor() {
  
  return (
    <div>
      <Helmet>
        <title>Add Counselor | MindEase</title>
      </Helmet>
      <div className='flex justify-center w-full'>
        <AddForm />
      </div>
    </div>
  )
}

export default AddCounselor
