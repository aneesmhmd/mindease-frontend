import { adminAxiosInstance } from "../utils/axiosUtils"


const addCounselor = (values) =>{
    return adminAxiosInstance.post('/add-counselor/', values, {withCredentials: true})
}

// const isAdminAuth = () =>{
//     return adminAxiosInstance.get('/')
// }
    
export {addCounselor}