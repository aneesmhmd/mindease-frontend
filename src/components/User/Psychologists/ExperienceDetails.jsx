import React, { useEffect, useState } from 'react'
import { FaHospital } from 'react-icons/fa'
import { getCounselorExperience } from '../../../services/userApi';


function ExperienceDetails({ counselorId }) {

    const [experiences, setExperiences] = useState([])

    useEffect(() => {
        getExperiences();
    }, [counselorId])

    const getExperiences = async () => {
        await getCounselorExperience(counselorId).then((res) => {
            setExperiences(res.data)
            console.log('exp', res.data);
        }).catch((err) => {
            console.log('exp err', err);
        })
    }

    return (
        <div className='flex flex-col bg-opacity-90 text-black rounded-b-lg w-full'>
            <div className='flex flex-col w-full items-center bg-blue-gray-500 py-1 text-white'>
                Experience Details
            </div>

            {experiences && experiences.map((experience, index) => (

                <div key={index} className='flex md:flex-row flex-col w-full'>
                    <div className='flex flex-col mt-3 justify-start md:items-start md:ms-10 items-center gap-1 lg:w-3/4 w-full'>
                        <div className='flex flex-col mb-2 w-full'>
                            <div className='flex flex-row gap-2'>
                                <FaHospital strokeWidth={2} className="h-4 w-4 mt-1.5" />
                                <span className='text-blue-900 md:text-lg  font-serif'>{experience.institute} ,<span className='text-base'>{experience.location}</span></span>
                            </div>
                            <h1 className='ms-6 text-sm font-sans'>{experience.state}, {experience.country}</h1>
                            <h1 className='ms-6 text-sm font-sans'>
                                {experience.years_of_experience && experience.years_of_experience + ' years '}
                                {experience.months_of_experience && experience  .months_of_experience + ' months'}</h1>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default ExperienceDetails
