import { Button, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { listCounselors } from '../../../Services/userApi'
import { TagIcon } from "@heroicons/react/24/solid";
import './PsychologistCard.css'

function PsychologistsCard() {

    const [psychologists, setPsychologists] = useState([])

    useEffect(() => {
        listPsychologists()
    }, [])

    const listPsychologists = async () => {
        listCounselors().then((res) => {
            setPsychologists(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="flex items-center flex-col gap-5 h-screen overflow-y-scroll custom-scrollbar">
            <Typography
                className="font-serif"
                variant="h3"
                color="white"
            >
                Best Psychologists in India
            </Typography>


            {psychologists && psychologists.map((psychologist, index) => (

                <div key={index} className='flex md:flex-row flex-col shadow-lg border-t bg-gray-100 bg-opacity-90 rounded-lg md:w-1/2 w-3/4 p-3 gap-3'>

                    <div className='flex flex-col items-center lg:w-1/4'>

                        <img
                            className="h-40 w-40 rounded-lg object-cover shadow-xl border-2"
                            src={psychologist.counselor_details.profile_image && psychologist.counselor_details.profile_image}
                            alt={psychologist.counselor_details.first_name} />

                    </div>

                    <div className='flex  flex-col lg:w-3/4 mt-4 lg:items-start items-center  gap-2'>
                        <Typography className="font-serif font-semibold text-lg text-blue-800">
                            Dr.{psychologist?.counselor_details?.first_name} {psychologist?.counselor_details?.last_name}
                        </Typography>

                        <div className='flex flex-row gap-2'>
                            <TagIcon strokeWidth={2}
                                className="h-4 w-4 mt-0.5" /><Typography className='text-sm font-sans'>
                                Top Psychologist in {psychologist.state}
                            </Typography>
                        </div>

                        <div className='flex flex-row gap-2'>
                            <TagIcon strokeWidth={2}
                                className="h-4 w-4 mt-0.5" /><Typography className='text-sm font-sans'>
                               {psychologist?.specialization_details?.title} specialist
                            </Typography>
                        </div>

                        <Button size='sm' className='py-1 w-32 mt-2' color='blue-gray'>View Profile</Button>

                    </div>
                </div>
            ))}

        </div>
    )
}

export default PsychologistsCard
