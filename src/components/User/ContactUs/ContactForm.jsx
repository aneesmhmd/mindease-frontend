import { Typography } from '@material-tailwind/react'
import React from 'react'
import DetailsForm from './DetailsForm'

function ContactForm() {
  return (
    <div>
      <div className='flex md:flex-row flex-col w-full gap-4 justify-center mt-24'>

        <div className='flex flex-col md:w-1/3 h-96 justify-center gap-3 px-4'>

          <Typography
            variant='h4'
            color='deep-purple'
            className='font-serif'
          >
            Best Mental Health Helpline in India
          </Typography>

          <Typography
            color='blue-gray'
          >
            MindEase is the best online counselling and therapy consultation platform in India.
            Consult Online Psychologist, Counsellor, Mental Health Therapist Now.
          </Typography>

          <Typography
            color='blue-gray'
          >
            If you are having any complaints, concerns or queries regarding our counselors and consultation or any other services, feel free to enquire.
          </Typography>

          <Typography
            color='blue-gray'
          >
            Let us help you in the best way possible.
          </Typography>

          <Typography
            color='blue-gray'
          >
            Connect us now. Fill the Form For Any Queries.
          </Typography>



        </div>
        <div className='md:w-1/4 md:mx-0 mx-4'>
          <DetailsForm/>
        </div>

      </div>
    </div>
  )
}

export default ContactForm
