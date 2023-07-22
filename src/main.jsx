import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={client_id}>
    <ThemeProvider>
      <ToastContainer autoClose={1000} hideProgressBar={true} limit={2} className='mt-15'/>
        <App />
    </ThemeProvider>
  </GoogleOAuthProvider>,
)
