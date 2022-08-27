import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.min.css';
import { ContactProvider } from './context/Contact.context';
import { AuthProvider } from './context/Auth.Context';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  // BrowserRouter behind the scene use context api. for this reason we have to use as root component if we use Route,Routes,useNavigate etc.
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
          <ContactProvider>
            <App />
          </ContactProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
