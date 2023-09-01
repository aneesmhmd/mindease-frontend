import React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { decodedToken } from "../../Context/auth";

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

export default function VideoCall() {
  const roomID = getUrlParams().get("roomID") || randomID(10);
  let role_str = getUrlParams().get("role") || "Host";
  const role =
    role_str === "Host" ? ZegoUIKitPrebuilt.Host : ZegoUIKitPrebuilt.Audience;

  let sharedLinks = [];
  sharedLinks.push({
    name: "Join",
    url:
      "?roomID=" +
      roomID +
      "&role=Audience",
  });

  // Generate Kit Token
  const appID = 2142154147;
  const serverSecret = '7a6c6b8195fde39f44e9a977019be77a';
  const userId = randomID(7);
  const token = decodedToken("counselorJwt")
  const userName = 'Dr.' + token.name ;
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
      sharedLinks,
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
