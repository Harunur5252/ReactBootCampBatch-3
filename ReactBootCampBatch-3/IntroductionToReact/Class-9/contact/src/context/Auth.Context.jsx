import { createContext,useState } from "react";
import { axiosPublicInstance } from "../config/axios";
import { toast } from 'react-toastify';
import { useNavigate,useLocation } from 'react-router-dom';

export const AuthContext  = createContext()

// getting user and token from localStorage
const loadedUser  = JSON.parse(localStorage.getItem('user'))
const loadedToken = JSON.parse(localStorage.getItem('token'))

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(loadedUser ? loadedUser : null)
    const [token,setToken] = useState(loadedToken ? loadedToken : null)
    const navigate = useNavigate()
    const location = useLocation()
    // register data
     const registerUser = async (data) => {
        try {
            const response = await axiosPublicInstance.post('/auth/local/register',data)
            const {user,jwt} = response.data
            // setting data to localStorage
            localStorage.setItem('user',JSON.stringify(user))
            localStorage.setItem('token',JSON.stringify(jwt))

           // setting user user and jwt(json web token) to state
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

           // setting user and jwt(json web token) to state
            setUser(user)
            setToken(jwt)

            // redirecting to contacts page
            navigate(location?.state?.from ? location?.state?.from : '/contacts')
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
      // removing data from localStorage
      localStorage.removeItem('user')
      localStorage.removeItem('token')

      // removing data from state
      setUser(null)
      setToken(null)
      toast.success('Logout successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/login')
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