import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'react-toastify';
import login, { getLocal } from '../../Context/auth';
import jwtDecode from 'jwt-decode';
import { googleAuthentication } from '../../Services/userApi';


function Login() {


  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const message = urlParams.get('message');
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState([]);
  const [values, setValues] = useState({ email: "", password: "" });

  useEffect(() => {
    document.title = "Login | MindEase";
  },[]);


  useEffect(() => {
    if (message) {
      if(message.length === 13){
        toast.error(message)
      }else{
        toast.success(message)
      }
      // params.delete('message');
      // const newUrl = `${location.pathname}${params.toString()}`;
      // window.history.replaceState({}, '', newUrl);
    }

    const checkLoggedInUser = async () => {
      const localResponse = getLocal('authToken');

      if (localResponse) {
        const decoded = jwtDecode(localResponse);

        if (decoded.role === 'admin') {
          navigate('/admin', { replace: true })
        } else if (decoded.role === 'counselor') {
          toast.info('Counselor')
        } else {
          navigate('/')
        }
      }
    };

    checkLoggedInUser();
  }, [navigate]);


  // Google login
  const handleGoogleAuth = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
    if (user) {
      axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: 'application/json'
        }
      })
        .then((res) => {
          const userProfile = res.data
          googleAuthentication(userProfile).then((res) => {
            console.log('final result :', jwtDecode(JSON.stringify(res.data.token)));
            if (res.data.status === 200) {
              localStorage.setItem('authToken', JSON.stringify(res.data.token));
              toast.success(res.data.msg)
              navigate('/')
            } else if (res.data.status === 400) {
              toast.error(res.data.msg)
            }
          })
        })
        .catch((err) => toast.error('Something went wrong!'));
    }
  }, [user])



  // email login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (values.email.trim() === "") {
      return toast.error('Email should not be empty');
    } else if (values.password.trim() === "") {
      return toast.error("Password should not be empty");
    }
    const loginResponse = await login(values);

    if (loginResponse) {
      navigate('/')
    }
  };


  return (
    <div className="flex flex-col md:flex-row h-screen">

      <div className="bg-white-200 md:w-1/2 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-800">MindEase</h2>

        <h4 className="text-xl  text-gray-800 mb-4 font-casual">
          "Find Ease, Unlock Your Peace"
        </h4>
        <img
          src="https://www.samvednacare.com/blog/wp-content/uploads/2022/02/Samvedhna_Feb_Blog-01-1.png"
          alt="Company Logo"
          className="w-96 h-96 object-contain mb-4"
        />
        <h2 className="text-2xl text-gray-800">Online Counseling Platform</h2>

      </div>
      <div className="bg-white flex flex-col justify-center items-center md:w-1/2">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Login into your account</h1>
        <form onSubmit={handleLogin} className="w-full max-w-xs">
          <div className="mb-4">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-500" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => {
                  setValues({ ...values, [e.target.name]: e.target.value })
                }}
                className="border rounded-md pl-10 py-2 w-full focus:outline-none focus:border-blue-500"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FontAwesomeIcon icon={faLock} className="text-gray-500" />
              </div>
              <input
                type="password"
                id="password"
                name='password'
                onChange={(e) => {
                  setValues({ ...values, [e.target.name]: e.target.value })
                }}
                className="border rounded-md pl-10 py-2 w-full focus:outline-none focus:border-blue-500"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 w-full"
            >
              Log In
            </button>
          </div>
          <div className="mb-4 text-center">
            <button
              type="button"
              className="text-blue-500 hover:underline"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot Password?
            </button>
          </div>
          <div className="mb-4">
            <button
              type="button"
              className="bg-white text-gray-500 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 w-full"
              onClick={handleGoogleAuth}
            >
              <FontAwesomeIcon
                icon={faGoogle}
                className="text-blue-500 mr-2"
              />
              Continue with Google
            </button>
          </div>
          <div className="text-center">
            <span className="text-gray-600">Don't have an account?</span>
            <button
              type="button"
              className="text-blue-500 hover:underline ml-1"
              onClick={() => navigate("/register")}
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

