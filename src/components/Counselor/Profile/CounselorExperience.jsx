import { Button, Chip } from '@material-tailwind/react'
import React, { useState } from 'react'
import { FaHospital, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { getCounselorExperience } from '../../../services/counselorApi'
import { useEffect } from 'react'
import { getLocal } from '../../../Context/auth'
import jwtDecode from 'jwt-decode'

function CounselorExperience() {
  const [experiences, setExperience] = useState([])

  useEffect(() => {
    getExperience();
  }, [])

  const getExperience = async () => {
    const token = getLocal('counselorJwt')
    const decoded = jwtDecode(token)
    const counselor = decoded.user_id

    getCounselorExperience(counselor).then((res) => {
      setExperience(res.data);
    })
  }
  return (
    <div className='flex flex-col bg-white bg-opacity-90 text-black rounded-b-lg'>
      <div className='flex md:flex-row flex-col w-full'>
        <div className='md:w-1/2 w-full'>
          {experiences && experiences.map((item, index) => (

            <div key={index} className='flex flex-col mt-5 mb-5 justify-start md:items-start md:ms-10 items-center gap-1 lg:w-3/4 w-full'>
              <div className='flex flex-col mb-2 w-full'>

                <div className='flex flex-row gap-2'>
                  <FaHospital strokeWidth={2} className="h-4 w-4 mt-1.5" />
                  <span className='text-blue-900 md:text-lg  font-serif'>{item.institute}, {item.location}</span>
                  <Chip
                    size='sm'
                    variant="ghost"
                    value={item.is_verified ? 'Verified' : 'Pending'}
                    color={item.is_verified ? "green" : "orange"}
                    className='w-max ms-2 max-h-6'
                  />
                </div>

                <h1 className='ms-6 text-sm font-sans'>{item.state}, {item.country}</h1>
                <h1 className='ms-6 text-sm font-sans'>
                  {item.years_of_experience && item.years_of_experience + ' years '}
                  {item.months_of_experience && item.months_of_experience + ' months'}</h1>
              </div>
            </div>
          ))}

        </div>

        <div className='flex items-start m-4 justify-end md:w-1/2'>
          <Link to='/counselor/add-experience'>
            <Button className="flex items-center gap-1 bg-dark-purple p-2 rounded-full">
              <FaPlus className="h-3 w-3" />
              Add Experience
            </Button>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default CounselorExperience
