import { adminAxiosInstance } from "../utils/axiosUtils"

const adminLogin = (values) => {
    return adminAxiosInstance.post('/login/', values, {
        withCredentials: true
    })
}


const addCounselor = (values) => {
    return adminAxiosInstance.post('/add-counselor/', values, {
        withCredentials: true
    })
}

// const isAdminAuth = () =>{
//     return adminAxiosInstance.get('/')
// }

export {
    addCounselor,
    adminLogin
}