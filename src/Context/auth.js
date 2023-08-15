import jwtDecode from "jwt-decode";

export function getLocal(tokenName) {
  const response = localStorage.getItem(tokenName);
  return response;
}

export function decodedToken(tokenName) {
  const token = getLocal(tokenName);
  if (token) {
    const decoded = jwtDecode(token);
    return decoded;
  } else {
    return null
  }
}

export default function isLogged(tokenName) {
  const localResponse = getLocal(tokenName);
  console.log("Local response :", localResponse);
  if (localResponse) {
    const decoded = jwtDecode(localResponse);
    if (tokenName === "userJwt" && decoded.role === "user") {
      return "user";
    } else if (tokenName === "counselorJwt" && decoded.role === "counselor") {
      return "counselor";
    } else if (tokenName === "adminJwt" && decoded.role === "admin") {
      return "admin";
    }
  } else {
    return null;
  }
}
