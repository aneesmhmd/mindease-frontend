import { toast } from 'react-toastify';
import axios from 'axios';

export default async function login(values) {
    try {
        const response = await axios.post(import.meta.env.VITE_BASE_USER_URL + '/api/token/', values);
        if (response.status === 200) {
            const data = response.data;
            localStorage.setItem('authToken', JSON.stringify(data));
            toast.success('Login successful');
            return data;
        } else {
            toast.error('Invalid login credentials');
        }
    } catch(error) {
        toast.error('Invalid login credentials');
    }
}


export function getLocal() {
    const response = localStorage.getItem('authToken');
    return response
}