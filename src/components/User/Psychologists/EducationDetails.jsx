import React, { useEffect, useState } from 'react'
import { AcademicCapIcon } from '@heroicons/react/24/solid'
import { Button, Chip } from '@material-tailwind/react'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'
import { getCounselorEducation } from '../../../services/userApi'

function EducationDetails({ counselorId }) {

    const [educations, setEducations] = useState([])

    useEffect(() => {
        getEducations();
    }, [counselorId])

    const getEducations = async () => {
        await getCounselorEducation(counselorId).then((res) => {
            setEducations(res.data)
            console.log('educatio:', res.data);
        }).catch((err) => {
            console.log('Education err', err);
        })

    }


    return (
        <div className='flex flex-col bg-opacity-90 text-black rounded-b-lg w-full'>
            <div className='flex flex-col w-full items-center bg-blue-gray-500 py-1 text-white'>
                Educational Details
            </div>

            {educations && educations.map((education, index) => (

                <div key={index} className='flex md:flex-row flex-col w-full'>
                    <div className='flex flex-col mt-3 justify-start md:items-start md:ms-10 items-center gap-1 lg:w-3/4 w-full'>
                        <div className='flex flex-col mb-2 w-full'>
                            <div className='flex flex-row gap-2'>
                                <AcademicCapIcon strokeWidth={2} className="h-4 w-4 mt-1.5" />
                                <span className='text-blue-900 md:text-lg  font-serif'>{education?.qualification} <span className='text-base'>({education?.year})</span></span>
                            </div>
                            <h1 className='ms-6 text-sm font-sans'>{education?.university}, {education?.state}, {education.country}</h1>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default EducationDetails
