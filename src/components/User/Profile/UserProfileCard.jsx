import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getUserProfile } from "../../../services/userApi";
import { useNavigate } from "react-router-dom";
import { decodedToken } from "../../../Context/auth";
import EditProfile from "./EditProfile";
import image from "../../../images/userprofile.jpg";
import ProfileImageUpdater from "./ProfileImageUpdater";

function UserProfileCard() {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    getProfileDetails();
  }, [navigate]);

  async function getProfileDetails() {
    const decoded = decodedToken("userJwt");
    const user_id = decoded.user_id;
    getUserProfile(user_id)
      .then((res) => {
        setProfile(res.data);
        console.log("this is the profile:", res.data);
      })
      .catch((error) => {
        console.log("Profile details error:", error);
      });
  }
  return (
    <div className="flex flex-col align-middle items-center w-full">
      <div className=" text-center w-3/4  mt-10 border lg:rounded-tl-lg rounded-t-xl bg-dark-purple">
        <h1 className="py-2 md:text-lg text-white">Account Details</h1>
      </div>
      <div className="flex mx-28 bg-white shadow-lg rounded-b-xl w-3/4 bg-opacity-75">
        <div className="flex md:flex-row flex-col w-full">
          <div className="flex justify-center lg:w-1/4 w-full">
            <img
              className="h-44 w-44 rounded-lg bg-white object-cover object-center opacity-100 md:m-8 mt-6 shadow-lg"
              src={profile.profile_image ? profile.profile_image : image}
              alt={profile.first_name}
              onClick={toggleOptions}
            />

            {showOptions && (
              <div>
                <ProfileImageUpdater
                  getProfileDetails={getProfileDetails}
                  profile_image={profile.profile_image}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col md:mt-8 justify-start md:items-start items-center gap-2 lg:w-3/4 w-full font-serif md:text-lg">
            <span>First name : {profile.first_name}</span>
            <h1>Last Name : {profile.last_name}</h1>
            <h1>Email : {profile.email}</h1>
            <h1>Phone : {profile.phone}</h1>
            <EditProfile profile={profile} getProfile={getProfileDetails} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileCard;
