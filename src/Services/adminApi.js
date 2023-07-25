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
    console.log('This is teh id:',id);
    return adminAxiosInstance.delete(`/delete-service/${id}/`, {
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
}