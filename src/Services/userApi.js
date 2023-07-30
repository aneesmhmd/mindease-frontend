import {userAxiosInstance} from "../utils/axiosUtils";


const userSignup = (values) => {
    return userAxiosInstance.post('/api/register/', values, {withCredentials: true})
}


const userLogin = (values) => {
    return userAxiosInstance.post('/api/token/', values, {withCredentials: true})
}


const googleAuthentication = (value) => {
    const values = {
        email: value.email,
        first_name: value.given_name,
        last_name: value.family_name,
        password: value.id,
        is_google: true
    }
    return userAxiosInstance.post("/api/google_authentication/", values, {withCredentials: true})
}


const getAllServices = () => {
    return userAxiosInstance.get("/services/services-list", {withCredentials: true})
}


const isUserAuth = () => {
    return userAxiosInstance.get('/api/user-auth', {withCredentials: true})
}


const getUserProfile = (user_id) => {
    return userAxiosInstance.get(`/api/user-profile/${user_id}/`, {withCredentials: true})
}


const updateUserProfile = (values, id) => {
    return userAxiosInstance.put(`/api/update-profile/${id}/`, values, {withCredentials: true})
}


const changeUserPassword = (values, id) => {
    return userAxiosInstance.post(`/api/change-password/${id}/`, values, {withCredentials: true})
}

export {
    googleAuthentication,
    getAllServices,
    userLogin,
    userSignup,
    isUserAuth,
    getUserProfile,
    changeUserPassword,
    updateUserProfile
}
