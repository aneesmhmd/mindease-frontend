import { toast } from 'react-toastify';
import axios from 'axios';

export default async function login(values) {
    try {
        const response = await axios.post(import.meta.env.VITE_BASE_URL + '/api/token/', values);
        if (response.status === 200) {
            const data = response.data;
            console.log('token', data);
            localStorage.setItem('authToken', JSON.stringify(data));
            toast.success('Login successful');
            return data;
        } else {
            toast.error('Invalid user credentials');
        }
    } catch (error) {
        toast.error('Login failed');
    }
}


export function getLocal() {
    const response = localStorage.getItem('authToken');
    return response
}