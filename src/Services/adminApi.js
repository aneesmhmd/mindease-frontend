import { adminAxiosInstance } from "../utils/axiosUtils"


const adminLogin = (values) => {
    return adminAxiosInstance.post('/login/', values, {
        withCredentials: true
    })
}


const adminUserDetails = () => {
    return adminAxiosInstance.get('/list-users/', {
        withCredentials: true
    })
}


const adminManageUser = (id) => {
    return adminAxiosInstance.patch(`/manage-user/${id}/`, {
        withCredentials: true
    })
}


const addCounselor = (values) => {
    return adminAxiosInstance.post('/add-counselor/', values, {
        withCredentials: true
    })
}


const adminCounselorDetails = () => {
    return adminAxiosInstance.get('/list-counselors/', {
        withCredentials: true
    })
}


const adminManageCounselor = (id) => {
    return adminAxiosInstance.patch(`/manage-counselor/${id}/`, {
        withCredentials: true
    })
}


const adminListServices = () => {
    return adminAxiosInstance.get('/list-services', {
        withCredentials: true
    })
}

const adminAddService = (values) => {
    return adminAxiosInstance.post('/add-services/', values, {
        withCredentials: true
    })
}


const adminUpdateService = (id, updatedData) => {
    return adminAxiosInstance.put(`/update-service/${id}/`, updatedData, {
        withCredentials: true
    })
}


const adminManageService = (id) => {
    return adminAxiosInstance.patch(`/manage-service/${id}/`, {
        withCredentials: true
    })
}


const adminDeleteService = (id) => {
    return adminAxiosInstance.delete(`/delete-service/${id}/`, {
        withCredentials: true
    })
}


const adminListEducationReqs = () => {
    return adminAxiosInstance.get(`/list-education-request/`, {
        withCredentials: true
    })
}


const adminListExperienceReqs = () => {
    return adminAxiosInstance.get(`list-experience-request/`, {
        withCredentials: true
    })
}


const adminGetEducationDetails = (id) => {
    return adminAxiosInstance.get(`get-education-details/${id}/`, {
        withCredentials: true
    })
}


const adminGetExperienceDetails = (id) => {
    return adminAxiosInstance.get(`get-experience-details/${id}/`, {
        withCredentials: true
    })
}


const adminVerifyEducationReqs = (id) => {
    return adminAxiosInstance.patch(`verify-education-request/${id}/`, {
        withCredentials: true
    })
}


const adminVerifyExperienceReqs = (id) => {
    return adminAxiosInstance.patch(`verify-experience-request/${id}/`, {
        withCredentials: true
    })
}


const adminDeclineEducationReqs = (id) => {
    return adminAxiosInstance.delete(`decline-education-request/${id}/`, {
        withCredentials: true
    })
}


const adminDeclineExperienceReqs = (id) => {
    return adminAxiosInstance.delete(`decline-experience-request/${id}/`, {
        withCredentials: true
    })
}





// const isAdminAuth = () =>{
//     return adminAxiosInstance.get('/')
// }

export {
    addCounselor,
    adminLogin,
    adminUserDetails,
    adminManageUser,
    adminCounselorDetails,
    adminManageCounselor,
    adminListServices,
    adminAddService,
    adminUpdateService,
    adminManageService,
    adminDeleteService,
    adminListEducationReqs,
    adminListExperienceReqs,
    adminVerifyEducationReqs,
    adminVerifyExperienceReqs,
    adminGetEducationDetails,
    adminGetExperienceDetails,
    adminDeclineEducationReqs,
    adminDeclineExperienceReqs,
}