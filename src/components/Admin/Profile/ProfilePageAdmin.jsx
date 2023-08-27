import React, { useEffect, useState } from "react";
import { adminGetProfile } from "../../../services/adminApi";
import image from "../../../images/administrator.png";
import AdminProfilePic from "./AdminProfilePic";
import { decodedToken } from "../../../Context/auth";
import ChangePassword from "./ChangePassword";
import axios from "axios";
import { AdminUrl } from "../../../constants/constants";

function ProfilePageAdmin() {
  const [profile, setProfile] = useState({});
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => setShowOptions((cur) => !cur);

  useEffect(() => {
    getProfile();
  }, []);
  // await adminGetProfile(id)

  const getProfile = async () => {
    const token = decodedToken("adminJwt");
    const id = token.id;
    await axios.get(AdminUrl + `/get-admin-profile/${id}`).then((res) => {
      setProfile(res.data);
    });
  };

  return (
    <div className="flex flex-col align-middle items-center">
      <div className=" text-center w-3/4  mt-5 border lg:rounded-tl-lg rounded-t-xl">
        <h1 className="py-2 md:text-lg">Profile Details</h1>
      </div>

      <div className="flex mx-28 bg-gray-200 shadow-lg rounded-b-xl w-3/4 bg-opacity-80">
        <div className="flex md:flex-row flex-col w-full">
          <div className="flex justify-center lg:w-1/4 w-full">
            <img
              className="h-44 w-44 rounded-lg bg-white object-cover object-center opacity-100 md:m-8 mt-4 shadow-lg"
              src={profile.profile_image ? profile.profile_image : image}
              alt={profile.first_name}
              onClick={toggleOptions}
            />

            {showOptions && (
              <div>
                <AdminProfilePic
                  getProfile={getProfile}
                  profile_image={profile.profile_image}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col md:mt-14 justify-start md:items-start items-center gap-1 lg:w-3/4 w-full font-serif md:text-lg">
            <span>First name : {profile?.first_name} </span>
            <h1>Last Name : {profile?.last_name} </h1>
            <h1>Email : {profile?.email}</h1>
            <h1>Phone : {profile?.phone}</h1>
          </div>
        </div>
      </div>
      <div className="w-3/4 mt-4 rounded-xl shadow-lg">
        <ChangePassword />
      </div>
    </div>
  );
}

export default ProfilePageAdmin;
