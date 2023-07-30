import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
    IconButton
} from "@material-tailwind/react";
import {MdMail, MdPhone} from 'react-icons/md'
import ProfileTabs from "./ProfileTabs";
import {useEffect, useState} from "react";
import {getUserProfile} from "../../../Services/userApi";
import {useNavigate} from "react-router-dom";
import {getLocal} from "../../../Context/auth";
import jwtDecode from "jwt-decode";
import {Helmet} from "react-helmet";
import EditProfile from "./EditProfile";

export default function ProfileCard() {
    const [profile, setProfile] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        getProfileDetails();
    }, [navigate])

    async function getProfileDetails() {
        const token = getLocal('userJwt');
        const decoded = jwtDecode(token)
        const user_id = decoded.user_id
        getUserProfile(user_id).then((res) => {
            setProfile(res.data)
            console.log('this is the profile:', res.data);
        }).catch((error) => {
            console.log('Profile details error:', error);
        })
    }


    return (
        <div className="flex justify-center md:flex-row flex-col mt-5">
            <Helmet>
                <title>
                    User Profile
                </title>
            </Helmet>

            <Card className="mx-10 h-96 flex items-center">
                <CardHeader floated={false}
                    className="h-40 w-40">
                    {profile.profile_image ? <img src={profile.profile_image} alt="profile-picture"/> 
                    : <img src="https://image.winudf.com/v2/image1/bmV0LndsbHBwci5ib3lzX3Byb2ZpbGVfcGljdHVyZXNfc2NyZWVuXzBfMTY2NzUzNzYxN18wOTk/screen-0.webp?fakeurl=1&type=.webp" alt="profile-picture"/>
                    }
                 </CardHeader>
                <CardBody className="text-center">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        { profile.first_name} {profile.last_name}
                    </Typography>
                    <div className="flex items-center justify-center">
                        <MdMail className="mr-2 h-5 w-5"/>
                        <Typography color="blue-gray" className="font-semibold " textGradient>
                            {profile.email}
                        </Typography>
                    </div>
                    <div className="flex items-center justify-center">
                        <MdPhone className="mr-2 h-5 w-5 text-black"/> 
                        <Typography color="blue-gray" className="font-semibold " textGradient>
                            { profile.phone }
                        </Typography>
                    </div>
                    <div className="flex items-center justify-center">
                        <EditProfile profile={profile} getProfile={getProfileDetails}/>
                    </div>

                </CardBody>
            </Card>

            <div className="md:w-2/3 md:my-0 my-5  mx-10 bg-white rounded-lg shadow-lg">
                <ProfileTabs id={profile.id}/>
            </div>
        </div>
    );
}
