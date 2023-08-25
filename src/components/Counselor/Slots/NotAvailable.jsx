import React from 'react'
import image from '../../../images/not-available.png'
import { Avatar, Typography } from '@material-tailwind/react'

function NotAvailable() {
  return (
    <div className="flex flex-col md:w-2/3 w-full bg-white text-center items-center gap-2 py-6 rounded-xl shadow-lg">
      {/* <Typography variant="h5" color="blue-gray">Oops!</Typography> */}
      <Avatar
          src={image}
          variant="rounded"
          alt="success"
          size="xxl"
          className="object-contain -mt-2"
        />
      <Typography variant="paragraph">You haven't added any slots on the selected date!</Typography>
    </div>
  )
}

export default NotAvailable
