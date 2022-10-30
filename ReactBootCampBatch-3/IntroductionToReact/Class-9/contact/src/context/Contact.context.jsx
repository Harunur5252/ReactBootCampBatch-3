import { createContext,useEffect,useReducer, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { axiosPrivateInstance } from "../config/axios";
import { formateContact } from "../utils/formateContact";
import contactsReducer from "./contactReducer";
import { DELETE_CONTACT,ADD_CONTACT,UPDATE_CONTACT, LOAD_CONTACTS } from "./contactType";
import { useContext } from "react";
import { AuthContext } from "./Auth.Context";


// create context
export const ContactContext = createContext()

// contacts initial data
const initialContacts = []


// create provider for data
export const ContactProvider = ({children}) => {
    // for tracking all contacts data
    const [contacts,dispatch] = useReducer(contactsReducer,initialContacts)
    const [loader,setLoader] = useState(false)
    const navigate = useNavigate()
    const [submit,setSubmit]=useState(false)
    const [submitUpdate,setSubmitUpdate]=useState(false)
    const [submitDelete,setSubmitDelete]=useState(false)
    const updateContactError = 'You have already a contact image,please delete before contact image then update'
    const [deleteSingleContactImg,setDeleteSingleContactImg]=useState(false)
    const {user,token,checkDeleteUserContact} = useContext(AuthContext)

   // initially load all contacts data by calling loadContacts()
   useEffect(() =>{
      (async () => {
        if(user && token){
          await loadContacts();
        }
      })()
   },[user,token,deleteSingleContactImg,checkDeleteUserContact])


    // load/get all contacts data by request from strapi server
  const loadContacts = async () => {
    try {
      const response = await axiosPrivateInstance(token).get('/contacts?populate=*')
      const loadedContacts = response.data.data.map(contact => formateContact(contact));
      dispatch({type:LOAD_CONTACTS,payload:loadedContacts})
      setLoader(true)
    } catch (err) {
      setLoader(true)
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

    // delete contact using dispatch
    const deleteContact = async (id,imgId) => {
        try {
          const deleteResponse = await axiosPrivateInstance(token).delete(`/upload/files/${imgId}`)
          const response = await axiosPrivateInstance(token).delete(`/contacts/${id}`) 
          dispatch({type:DELETE_CONTACT,payload : response.data.data.id})
          navigate('/contacts')
          toast.success("contact is deleted successfully !", {
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

   // add contact using dispatch
   const addContact = async (contact) => {
    const data = {
      firstName:contact.firstName,
      lastName:contact.lastName,
      email:contact.email,
      bio:contact.bio,
      profession:contact.profession,
      dateOfBirth:contact.dateOfBirth,
      gender:contact.gender,
      author:user.id
    }
    
    try {
       if(data && contact.image[0]){
        setSubmit(true)
        const formData = new FormData()
        formData.append('files.image',contact.image[0],contact.image[0].name)
        formData.append('data',JSON.stringify(data))
        const response = await axiosPrivateInstance(token).post('/contacts?populate=*',formData)
        
        const contactFromServer = formateContact(response.data.data)
        dispatch({type : ADD_CONTACT,payload:contactFromServer})
        setSubmit(false)
        // setSingleContactImgId(response.data.data.attributes?.image?.data?.id)
        toast.success("contact is added successfully !", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/contacts')
       }
       if(!contact.image[0]){
        toast.error('select inputs filed with image', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
       }
    } catch (err) {
      console.log(err.response)
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

  // update contact using dispatch
  const updateContact = async(contactToUpdate,id,imgId) => {
    const data = {
      firstName:contactToUpdate.firstName,
      lastName:contactToUpdate.lastName,
      email:contactToUpdate.email,
      bio:contactToUpdate.bio,
      profession:contactToUpdate.profession,
      dateOfBirth:contactToUpdate.dateOfBirth,
      gender:contactToUpdate.gender,
      author:user.id
    }
    try {
      if(data && !contactToUpdate.image[0] && imgId){
        setSubmitUpdate(true)
        const response = await axiosPrivateInstance(token).put(`/contacts/${id}?populate=*`,{
          data : data
        })
        const contact = formateContact(response.data.data)
        dispatch({type:UPDATE_CONTACT,payload:{id:contact.id,contact}})
        navigate(`/contacts/${id}`)
        setSubmitUpdate(false)
        toast.success('contact updated successfully', {
         position: "top-right",
         autoClose: 2000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
       });
      }
      if(data && contactToUpdate.image[0] && !imgId){
        setSubmitUpdate(true)
        const formData = new FormData()
        formData.append('files.image',contactToUpdate.image[0],contactToUpdate.image[0].name)
        formData.append('data',JSON.stringify(data))
        const response = await axiosPrivateInstance(token).put(`/contacts/${id}?populate=*`,formData)
         const contact = formateContact(response.data.data)
         dispatch({type:UPDATE_CONTACT,payload:{id:contact.id,contact}})
         navigate(`/contacts/${id}`)
         setSubmitUpdate(false)
         toast.success('contact updated successfully with image!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if(contactToUpdate.image[0] && imgId){
        toast.error('Please delete before image and then update data with image', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
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

  // delete contact image before update
  const deleteContactImage = async (id) => {
    try {
      setSubmitDelete(true)
     const deleteResponse = await axiosPrivateInstance(token).delete(`/upload/files/${id}`)
     setDeleteSingleContactImg(true)
     setSubmitDelete(false)
     toast.success('Before contact picture deleted successfully!,now you can upload a new contact picture', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    } catch (err) {
      console.log(err.response)
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
  
  // create an object to pass data with provider to any children
  const value = {
    loader,
    contacts,
    addContact,
    updateContact,
    deleteContact,
    submit,
    submitUpdate,
    deleteContactImage,
    submitDelete,
    loadContacts,
    updateContactError
  }

    return (
        <ContactContext.Provider value={value}>
            {children}
        </ContactContext.Provider>
    )
}
