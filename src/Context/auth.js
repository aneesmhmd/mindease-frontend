import jwtDecode from 'jwt-decode';

export function getLocal(tokenName) {
    const response = localStorage.getItem(tokenName);
    return response
}

export default function isLogged(tokenName) {
    const localResponse = getLocal(tokenName)
    console.log('Local response :', localResponse)
    if (localResponse) {
        const decoded = jwtDecode(localResponse)
        if (tokenName === 'userJwt' && decoded.role === 'user') {
            return 'user'
        } else if (tokenName === 'counselorJwt' && decoded.role === 'counselor') {
            return 'counselor'
        } else if (tokenName === 'adminJwt' && decoded.role === 'admin') {
            return 'admin'
        }
    }
}


// export async function login(values) {
//     try {
//         const response = await axios.post(import.meta.env.VITE_BASE_USER_URL + '/api/token/', values);
//         if (response.status === 200) {
//             const data = response.data;
//             localStorage.setItem('userJwt', JSON.stringify(data));
//             toast.success('Login successful');
//             return data;
//         } else {
//             toast.error('Invalid login credentials');
//         }
//     } catch (error) {
//         toast.error('Invalid login credentials');
//     }
// }
