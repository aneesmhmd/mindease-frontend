import axios from 'axios';
import { BaseUrl } from '../constants/constants';

const createAxiosClient = (baseURL) => {
    console.log('reached here also :', baseURL);
    const client = axios.create({
        baseURL,
        timeout: 8000,
        timeoutErrorMessage: "Request timeout Please Try Again!!!"
    })
    return client;
}

const attachToken = (req, tokenName) => {
    let authToken = localStorage.getItem(tokenName)
    if (authToken) {
        req.headers.Authorization = `Bearer ${authToken}`
    }
    return req
}

const userAxiosInstance = createAxiosClient(BaseUrl)
userAxiosInstance.interceptors.request.use(async (req) => {
    const modifiedReq = attachToken(req, "authToken")
    console.log('Ennem vilichu :' ,modifiedReq);
    return modifiedReq;
})

export {userAxiosInstance}

