import { createContext,useState,useEffect,useReducer } from "react";
import { axiosPublicInstance } from "../config/axios";
import { toast } from 'react-toastify';
import { useNavigate,useLocation } from 'react-router-dom';
import {axiosPrivateInstance} from '../config/axios'
import { authReducer } from "./authReducer";
import { LOGIN, LOGOUT, REGISTER, USER_CONTACTS, USER_CONTACT_DELETE } from "./authType";


export const AuthContext  = createContext()

// getting user and token from localStorage
const loadedUser  = JSON.parse(localStorage.getItem('user'))
const loadedToken = JSON.parse(localStorage.getItem('token'))

const initialUserContacts = []

export const AuthProvider = ({children}) => {
    const [userContacts,dispatch] = useReducer(authReducer,initialUserContacts)
    const [user,setUser] = useState(loadedUser ? loadedUser : null)
    const [token,setToken] = useState(loadedToken ? loadedToken : null)
    const [loaded,setLoaded] = useState(false)
    const [userContactsLoaded,setUserContactsLoaded] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
       if(user && token){
        (async () => {
            await loadedUserContact()
        })()
       }
    },[user,token])

    // login user all contacts show as list wise
    const loadedUserContact = async () => {
        try {
            const response = await axiosPrivateInstance(token).get('/users/me?populate=*')
            dispatch({type : USER_CONTACTS,payload : response.data.contacts})
            setLoaded(true)
            setUserContactsLoaded(true)
        } catch (err) {
            setLoaded(true)
            toast.error(err.response?.data?.error?.message, {
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

    // user contact delete
    const userContactDelete = async (id) => {
        try {
          const response = await axiosPrivateInstance(token).delete(`/contacts/${id}`) 
          dispatch({type:USER_CONTACT_DELETE,payload : response.data.data.id})
          toast.success("user contact is deleted successfully !", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }); 
        } catch (err) {
          toast.error(err.response?.data?.error?.message, {
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


    // registering data
     const registerUser = async (data) => {
        try {
            const response = await axiosPublicInstance.post('/auth/local/register',data)
            dispatch({type : REGISTER ,payload: {data : response.data,setUser,setToken}})
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
        } catch (err) {
            toast.error(err.response?.data?.error?.message, {
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

    // logging data
    const login = async (data) => {
        try {
            const response = await axiosPublicInstance.post('/auth/local',data)
            dispatch({type : LOGIN ,payload: {data : response.data,setUser,setToken}})
           
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
        } catch (err) {
            // show error toaster
            toast.error(err.response?.data?.error?.message, {
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

    // logout user
    const logout = () => {
      dispatch({type : LOGOUT , payload : {setUser,setToken}})
      navigate('/login')
      toast.success('Logout successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    // passing functions and variables to any children components
    const value = {
        user,
        token,
        registerUser,
        login,
        logout,
        userContacts,
        loaded,
        userContactDelete,
        userContactsLoaded,
        loadedUserContact
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}