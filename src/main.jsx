import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'


const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
console.log(client_id);

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={client_id}>
      <App />
  </GoogleOAuthProvider>,
)
