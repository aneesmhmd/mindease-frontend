import React, { useEffect, useState } from 'react'
import { getCounselorAccount, getCounselorProfile, updateCounselorProfile } from '../../../services/counselorApi'
import { decodedToken } from '../../../Context/auth'
import profilepic from '../../../images/counselor.png'
import DrawerPlacement from './ProfilePicture'
import EditProfile from './EditProfile'
import { toast } from 'react-toastify'
import { Button } from '@material-tailwind/react'
import EdiProffessional from './EdiProffessional'
import AddProffesional from './AddProffesional'


function ProfileCard() {
    const [profile, setProfile] = useState({})
    const [showOptions, setShowOptions] = useState(false);
    const [proffessional, setProffessional] = useState({})

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    useEffect(() => {
        getProfile();
        getProffessional();
    }, [])

    async function getProfile() {
        const decoded = decodedToken('counselorJwt')
        const user_id = decoded.user_id
        getCounselorProfile(user_id).then((res) => {
            setProfile(res.data)
        }).catch((error) => {
            console.log('Profile details error:', error);
        })
    }

    async function getProffessional() {
        const decoded = decodedToken('counselorJwt')
        const id = decoded.counselor
        getCounselorAccount(id).then((res) => {
            setProffessional(res.data)
            console.log('Success', res.data);
        }).catch((err) => {
            console.log('CAccount Error', err);
        })
    }

    async function updateProfile(updatedProfile) {
        updateCounselorProfile(profile.id, updatedProfile).then((res) => {
            getProfile();
            toast.success('Profile updated!')
        }).catch((err) => {
            console.log(err);
            toast.error('Some error occured.Please try again!')
        })
    }


    return (
        <div className='flex flex-col align-middle items-center w-full'>
            <div className=' text-center w-3/4  mt-10 border lg:rounded-tl-lg rounded-t-xl'>
                <h1 className='py-2 md:text-lg text-white'>Personal Details</h1>
            </div>

            <div className='flex mx-28 bg-gray-300 shadow-lg rounded-b-xl w-3/4 bg-opacity-80'>
                <div className='flex md:flex-row flex-col w-full'>

                    <div className='flex justify-center lg:w-1/4 w-full'>
                        <img
                            className="h-44 w-44 rounded-lg bg-white object-cover object-center opacity-100 md:m-8 mt-4 shadow-lg"
                            src={profile.profile_image ? profile.profile_image : profilepic}
                            alt={profile.first_name}
                            onClick={toggleOptions}
                        />

                        {showOptions &&
                            <div>
                                <DrawerPlacement getProfile={getProfile} profile_image={profile.profile_image} />
                            </div>
                        }
                    </div>

                    <div className='flex flex-col md:mt-10 justify-start md:items-start items-center gap-1 lg:w-3/4 w-full font-serif md:text-lg'>
                        <span>First name : {profile.first_name}</span>
                        <h1>Last Name : {profile.last_name}</h1>
                        <h1>Email : {profile.email}</h1>
                        <h1>Phone : {profile.phone}</h1>
                        <EditProfile profile={profile} updateProfile={updateProfile} />

                    </div>
                </div>
            </div>



            <div className='flex mx-28 bg-gray-300 shadow-lg rounded-xl w-3/4 bg-opacity-80 mt-4'>
                <div className='flex md:flex-row flex-col md:justify-around items-center w-full py-3'>
                    <h1>Fee : Rs.{proffessional.fee ? proffessional.fee : '--'}</h1>
                    <h1>Specialization : {proffessional.specialization ? proffessional.specialization_details.title : '--'}</h1>
                    <h1>State : {proffessional.state ? proffessional.state : '--'}</h1>
                    {proffessional.state ?
                        <EdiProffessional getProffessional={getProffessional} proffessional={proffessional}/> :
                        <AddProffesional getProffessional={getProffessional} />
                    }

                </div>
            </div>
        </div>
    )
}

export default ProfileCard
