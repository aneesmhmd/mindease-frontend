import axios from 'axios';
import { BaseUrl, AdminUrl, CounselorUrl } from '../constants/constants';

const createAxiosClient = (baseURL) => {
    console.log('reached here also :', baseURL);
    const client = axios.create({
        baseURL,
        timeout: 8000,
        timeoutErrorMessage: "Request timeout Please Try Again!!!"
    })
    console.log('Axios client created :', client);
    return client;
}

const attachToken = (req, tokenName) => {
    let authToken = localStorage.getItem(tokenName.access)
    
    if (authToken) {
        req.headers.Authorization = `Bearer ${authToken}`
    }
    return req
}


const userAxiosInstance = createAxiosClient(BaseUrl)
userAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, "userJwt")
    return modifiedReq;
})


const counselorAxiosInstance = createAxiosClient(CounselorUrl)
counselorAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, "counselorJwt")
    return modifiedReq;
})


const adminAxiosInstance = createAxiosClient(AdminUrl)
adminAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, "adminJwt")
    return modifiedReq;
})

export { userAxiosInstance, counselorAxiosInstance, adminAxiosInstance }

