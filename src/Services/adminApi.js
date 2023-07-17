import { userAxiosInstance } from "../utils/axiosUtils"


const addCounselor = (values) =>{
    return userAxiosInstance.post('/admin/add-counselor/', values, {withCredentials: true})
}

export {addCounselor}