import React, { useEffect, useState } from "react";
import { getMeetLink } from "../../../services/userApi";
import { decodedToken } from "../../../Context/auth";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Typography } from "@material-tailwind/react";
import image from "../../../images/crossMark.png";

function SessionPage() {
  const [link, setLink] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getLink();
  }, []);

  const getLink = () => {
    const token = decodedToken("userJwt");
    if (token) {
      getMeetLink(token.user_id)
        .then((res) => {
          setLink(res.data);
        })
        .catch((err) => {
          console.log("No link", err);
        });
    } else {
      navigate("/login");
    }
  };

  const handleJoinMeet = () => {
    window.open(link.link);
  };
  return (
    <div className="flex flex-col w-full -mt-10 items-center">
      {link ? (
        <div className="flex flex-col bg-blue-50 w-1/3 h-56 justify-center text-center gap-3 rounded-xl">
          <Typography variant="h6">
            Room for your session have been Created!
          </Typography>
          <Typography>
            Join the session by clicking on the button below.
          </Typography>
          <div>
            <Button onClick={() => handleJoinMeet()}>Join now</Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col bg-blue-50 w-1/3 h-56 justify-center items-center gap-3 rounded-xl">
          <Typography variant="h5"> OOPS! </Typography>
          <Avatar src={image} variant="rounded" alt="success" size="xl" />
          <div className="flex flex-col text-center">
            <Typography> There is no on going sessions. </Typography>
            <Typography> Please come back at your slot time! </Typography>
          </div>
        </div>
      )}
    </div>
  );
}

export default SessionPage;
