import React, { useEffect, useState } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { getUserProfile } from "../../../services/userApi";
import { decodedToken } from "../../../Context/auth";
import axios from "axios";
import { BaseUrl } from "../../../constants/constants";

function randomID(len) {
  let result = "";
  var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP";
  var maxPos = chars.length;
  len = 10;
  for (var i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

function getUrlParams(url) {
  url = url || window.location.href;
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

export default function SessionScreen() {
  const roomID = getUrlParams().get("roomID") || randomID(10);
  let role_str = getUrlParams().get("role") || "Host";
  const [profile, setProfile] = useState({});

  useEffect(() => {
    profileDetails();
  }, []);

  const profileDetails = async () => {
    const token = decodedToken("userJwt");
    await axios
      .get(BaseUrl + "/api/user-profile/" + token.user_id)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log("err", err);
        setProfile({});
      });
  };

  const role =
    role_str === "Host" ? ZegoUIKitPrebuilt.Host : ZegoUIKitPrebuilt.Audience;

  let sharedLinks = [];
  

  // Generate Kit Token
  const appID = 2142154147;
  const serverSecret = "7a6c6b8195fde39f44e9a977019be77a";
  const userId = randomID(7);
  const token = decodedToken("userJwt");
  const userName = token.name;
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomID,
    userId,
    userName
  );

  // Start the call
  let myMeeting = async (element) => {
    // Create instance object from Kit Token
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // Start the call
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
        config: {
          role,
        },
      },
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}
