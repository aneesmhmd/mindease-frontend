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
        console.log('Token taken :', JSON.stringify(authToken));
        req.headers.Authorization = `Bearer ${authToken}`
        // console.log('THis is the request header:',req.headers);
    }
    return req
}


const userAxiosInstance = createAxiosClient(BaseUrl)
userAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, "userJwt")
    console.log('Useraxios instance modified :', modifiedReq);
    return modifiedReq;
})


const counselorAxiosInstance = createAxiosClient(CounselorUrl)
counselorAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, "counselorJwt")
    console.log('Useraxios instance modified :', modifiedReq);
    return modifiedReq;
})


const adminAxiosInstance = createAxiosClient(AdminUrl)
adminAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, "adminJwt")
    console.log('Useraxios instance modified :', modifiedReq);
    return modifiedReq;
})

export { userAxiosInstance, counselorAxiosInstance, adminAxiosInstance }

