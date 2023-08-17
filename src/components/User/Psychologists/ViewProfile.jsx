import React, { useEffect, useState } from "react";
import {
  getCounselorEducation,
  getCounselorProfile,
} from "../../../services/userApi";
import { Button, Typography } from "@material-tailwind/react";
import { TagIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import EducationDetails from "./EducationDetails";
import ExperienceDetails from "./ExperienceDetails";

function ViewProfile() {
  const [profile, setProfile] = useState({});
  const [accountId, setAccountId] = useState();
  const urlParams = new URLSearchParams(window.location.search);
  const counselorId = urlParams.get("counselor");

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (accountId) {
      console.log("accountId is:", accountId);
    }
  }, [accountId]);

  const getProfile = async () => {
    await getCounselorProfile(counselorId)
      .then((res) => {
        setProfile(res.data);
        setAccountId(res.data.counselor_details.id);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  return (
    <div className="flex items-center flex-col gap-5 min-h-screen pt-20">
      <div className="flex md:flex-row flex-col shadow-lg border-t bg-gray-100 bg-opacity-90 rounded-lg md:w-1/2 w-3/4 p-3 gap-3 mt-5">
        <div className="flex flex-col items-center lg:w-1/4">
          <img
            className="h-40 w-40 rounded-lg object-cover shadow-xl border-2"
            src={
              profile?.counselor_details?.profile_image &&
              profile?.counselor_details?.profile_image
            }
            alt={profile?.counselor_details?.first_name}
          />
        </div>

        <div className="flex  flex-col lg:w-3/4 mt-4 lg:items-start items-center  gap-2">
          <Typography className="font-serif font-semibold text-lg text-blue-800">
            Dr.{profile?.counselor_details?.first_name}{" "}
            {profile?.counselor_details?.last_name}
          </Typography>

          <div className="flex flex-row gap-2">
            <TagIcon strokeWidth={2} className="h-4 w-4 mt-0.5" />
            <Typography className="text-sm font-sans">
              Top Psychologist in {profile.state}
            </Typography>
          </div>

          <div className="flex flex-row gap-2">
            <TagIcon strokeWidth={2} className="h-4 w-4 mt-0.5" />
            <Typography className="text-sm font-sans">
              {profile?.specialization_details?.title} specialist
            </Typography>
          </div>

          <Link>
            <Button size="sm" className="py-1 w-32 mt-2" color="blue-gray">
              Book Slot
            </Button>
          </Link>
        </div>
      </div>

      <div className="flex flex-col shadow-lg border-t rounded-lg md:w-1/2 w-3/4 p-3 gap-3">
        <EducationDetails counselorId={accountId} />
      </div>

      <div className="flex flex-col shadow-lg border-t rounded-lg md:w-1/2 w-3/4 p-3 gap-3">
        <ExperienceDetails counselorId={accountId} />
      </div>
    </div>
  );
}

export default ViewProfile;
