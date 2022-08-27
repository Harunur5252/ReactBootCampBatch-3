import { createContext,useState } from "react";
import { axiosPublicInstance } from "../config/axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AuthContext  = createContext()


export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [token,setToken] = useState(null)
    const navigate = useNavigate()

    // register data
     const registerUser = async (data) => {
        try {
            const response = await axiosPublicInstance.post('/auth/local/register',data)
            const {user,jwt} = response.data
            // setting data to localStorage
            localStorage.setItem('user',JSON.stringify(user))
            localStorage.setItem('token',JSON.stringify(jwt))

           // setting user ,jwt to state
            setUser(user)
            setToken(jwt)

            // redirecting to contacts page
            navigate('/contacts')
            toast.success('Registration successfully!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
             });
        } catch (error) {
            // show error toaster
            toast.error(error.response?.data?.error?.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
             });
        }
    }


    // login data
    const login = async (data) => {
        try {
            const response = await axiosPublicInstance.post('/auth/local',data)
            const {user,jwt} = response.data
            // setting data to localStorage
            localStorage.setItem('user',JSON.stringify(user))
            localStorage.setItem('token',JSON.stringify(jwt))

           // setting user ,jwt to state
            setUser(user)
            setToken(jwt)

            // redirecting to contacts page
            navigate('/contacts')
            toast.success('Login successfully!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
             });
        } catch (error) {
            // show error toaster
            toast.error(error.response?.data?.error?.message, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
             });
        }
    }

    // login data
    const logout = () => {

    }

    const value = {
        user,
        token,
        registerUser,
        login,
        logout

    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}