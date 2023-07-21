import { userAxiosInstance } from "../utils/axiosUtils";

const userLogin = (values) => {
    return userAxiosInstance.post('/api/token/', values, {
        withCredentials: true
    })
}


const userSignup = (values) => {
    return userAxiosInstance.post('/api/register/', values, {
        withCredentials: true
    })
}

const googleAuthentication = (value) => {
    const values = {
        email: value.email,
        first_name: value.given_name,
        last_name: value.family_name,
        password: value.id,
        is_google: true
    }
    return userAxiosInstance.post("/api/google_authentication/", values, {
        withCredentials: true
    })
}

const getAllServices = () => {
    return userAxiosInstance.get("/services/services-list", { withCredentials: true })
}

const isUserAuth = () => {
    return userAxiosInstance.get('/api/user-auth', {
        withCredentials: true
    })
}




export {
    googleAuthentication,
    getAllServices,
    userLogin,
    userSignup,
    isUserAuth
}