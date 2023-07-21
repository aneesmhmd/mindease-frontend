import { counselorAxiosInstance } from "../utils/axiosUtils";

const counselorLogin = (values) =>{
    return counselorAxiosInstance.post('/login/', values,{
        withCredentials:true
    })
}

// const isCounselorAuth = (values) =>{
//     return counselorAxiosInstance.post('/')
// }

export {
    counselorLogin
}