import AddForm from '../../components/Admin/AddCounselor/AddForm'
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
