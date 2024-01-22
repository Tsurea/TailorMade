import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App';
import axios from 'axios';
import { AuthService } from './Services/Auth.service';

// Axios default config
axios.defaults.headers.common['Authorization'] = AuthService.getAuthHeader();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
