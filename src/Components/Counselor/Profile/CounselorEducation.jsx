import React from 'react'
import {
    AcademicCapIcon,
    DocumentTextIcon
} from '@heroicons/react/24/solid'
import { Button, Chip } from '@material-tailwind/react'
import { FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { getCounselorEducation } from '../../../Services/counselorApi'
import { useState } from 'react'
import { getLocal } from '../../../Context/auth'
import jwtDecode from 'jwt-decode'
import { useEffect } from 'react'

function CounselorEducation() {
    const [educations, setEducation] = useState([])

    useEffect(() => {
        getEducation();
    }, [])

    const getEducation = async () => {
        const token = getLocal('counselorJwt')
        const decoded = jwtDecode(token)
        const id = decoded.user_id
        console.log('User id is :', id);
        getCounselorEducation(id).then((res) => {
            setEducation(res.data)
        })
    }
    return (
        <div className='flex flex-col bg-white bg-opacity-90 text-black rounded-b-lg'>
            <div className='flex md:flex-row flex-col w-full'>
                <div className='md:w-1/2 w-full'>

                    {educations && educations.map((item, index) => (

                        <div key={index} className='flex flex-col mt-5 mb-5 justify-start md:items-start md:ms-10 items-center gap-1 lg:w-3/4 w-full'>
                            <div className='flex flex-col mb-2 w-full'>
                                <div className='flex flex-row gap-2'>
                                    <AcademicCapIcon strokeWidth={2} className="h-4 w-4 mt-1.5" />
                                    <span className='text-blue-900 md:text-lg  font-serif'>{item.qualification} <span className='text-base'>({item.year})</span></span>
                                    <Chip
                                        size='sm'
                                        variant="ghost"
                                        className='w-max ms-2 max-h-6'
                                        value={item.is_verified ? 'Verified' : 'Pending'}
                                        color={item.is_verified ? "green" : "orange"}
                                    />
                                </div>
                                <h1 className='ms-6 text-sm font-sans'>{item.university}, {item.state}, {item.country}</h1>
                                {/* <button className='text-white bg-dark-purple px-2 w-3/12  rounded-full ms-6 mt-1 text-sm'>Edit</button> */}
                            </div>
                        </div>

                    ))}
                </div>
                <div className='flex items-start m-4 justify-end md:w-1/2'>
                    <Link to='/counselor/add-qualification'>
                        <Button className="flex items-center gap-1 bg-dark-purple p-2 rounded-full">
                            <FaPlus className="h-3 w-3" />
                            Add Education
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CounselorEducation
