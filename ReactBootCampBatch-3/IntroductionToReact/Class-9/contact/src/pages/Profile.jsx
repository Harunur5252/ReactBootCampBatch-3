import React,{ useContext,useState } from 'react'
import {AuthContext} from '../context/Auth.Context'
import {Button, Col, Form, Modal, ProgressBar, Row, Spinner, Table} from 'react-bootstrap'
import { axiosPrivateInstance } from '../config/axios';
import { toast } from 'react-toastify';
import { FaEdit } from "react-icons/fa";
import { useEffect } from 'react';
import Loader from '../components/Loader'
import NoImage from '../assets/image-not-found.jpg'


function Profile() {
  const {user,token} = useContext(AuthContext)
  const [file,setFile] = useState(null)
  const [updateFile,setUpdateFile] = useState(null)
  const [percentage,setPercentage] = useState(0)
  const updateErrorProfile = 'You have already a profile picture,please delete before profile picture then update'
  const [submitted,setSubmitted] = useState(false)
  const [submittedUpdate,setSubmittedUpdate] = useState(false)
  const [submittedDeleteProfileImg,setSubmittedDeleteProfileImg] = useState(false)
  const [deleteProfileImg,setDeleteProfileImg] = useState(false)
  const [responseProfileData,setResponseProfileData] = useState({
    profileId:'',
    userId:'',
    imgId:'',
    profilePicture:'',
    firstName:'',
    lastName:'',
  })
  const [updateProfileData,setUpdateProfileData] = useState({
    firstName : '',
    lastName : '',
    profilePicture: ''
  })
  const [profileData , setProfileData] = useState({
    firstName : '',
    lastName : '',
    profilePicture: ''
  })
  const [errors , setErrors] = useState({
    firstName : '',
    lastName : '',
    profilePicture: ''
  })
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // handling control way data
  const handleChange = (evt) => {
     setProfileData({
      ...profileData,
       [evt.target.name] : evt.target.value
     })
     setErrors({
      ...errors,
      [evt.target.name] : ''
     })
      setFile(evt.target.files[0])
      setSubmitted(false)
  }
  const {firstName,lastName,profilePicture} = profileData

  // setting input fields empty string for avoid react batch update
  const profileDataErrors = {
    firstName : '',
    lastName : '',
    profilePicture: ''
  }

 // handling input errors
  const formDataError = () => {
    const firstNameRegex = /^[a-z_-]{5,15}$/gi
    if(firstName === ''){
      profileDataErrors.firstName = 'firstName is required'
    }else if(!firstNameRegex.test(firstName)){
      profileDataErrors.firstName = 'firstName is invalid'
    }

    const lastNameRegex = /^[a-z_-]{5,15}$/gi
    if(lastName === ''){
      profileDataErrors.lastName = 'lastName is required'
    }else if(!lastNameRegex.test(lastName)){
      profileDataErrors.lastName = 'lastName is invalid'
    }

    const profilePictureRegex = /((http?s)(\/\/)(:))?[\w@#\$%\^&*\.()]+(\.)(png|jpg|jpeg|svg|web|gif)/gi
    if(profilePicture === ''){
      profileDataErrors.profilePicture = 'profilePicture is required'
    }else if(!profilePictureRegex.test(profilePicture)){
      profileDataErrors.profilePicture = 'profilePicture is invalid'
    }

    setErrors(profileDataErrors)
  }

  const uploadPercentage = (total,loaded) => Math.floor((total/loaded)*100)

  // submit image with others fields data
  const handleSubmit = async (evt) => {
    evt.preventDefault()
    // handling errors
    formDataError()
    const data = {
      firstName,
      lastName,
      user : user.id
    }
    const firstNameRegex = /^[a-z_-]{5,15}$/gi
    const lastNameRegex = /^[a-z_-]{5,15}$/gi
    try {
      
      if(firstName && lastName && file && firstNameRegex.test(firstName) && lastNameRegex.test(lastName)){
        setSubmitted(true)
        const formData = new FormData()
        formData.append('files.profilePicture',file,file.name)
        formData.append('data',JSON.stringify(data))
          const response = await axiosPrivateInstance(token).post('/profiles?populate=*',
        formData,
        {
          onUploadProgress:(progress) => {
              const percentageData = uploadPercentage(progress.total,progress.loaded)
              setPercentage(percentageData)
          }
        }
        )
        
        setSubmitted(false)
        toast.success('Image uploaded successfully with data', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
       if(!submitted){
          setProfileData({
           firstName : '',
           lastName : '',
           profilePicture: ''
         })
         setFile(null)
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
      setSubmitted(false)
    }
  }
  const nowOne = percentage


  // getting user profile data
  useEffect(() =>{
    (async () => {
      if(user){
        await loadUserProfileData();
      }
    })()
 },[user,submitted,deleteProfileImg,submittedUpdate])

  const loadUserProfileData = async () => {
    try {
      const response = await axiosPrivateInstance(token).get('/profiles?populate=*')
      const pro = response.data.data.filter((item) => {
        return item.attributes.user.data.id === user.id
      })
      
      setResponseProfileData({
        profileId : pro[0]?.id,
        userId : pro[0]?.attributes?.user?.data?.id,
        imgId : pro[0]?.attributes?.profilePicture?.data?.id,
        firstName : pro[0]?.attributes?.firstName,
        lastName : pro[0]?.attributes?.lastName,
        profilePicture : pro[0]?.attributes?.profilePicture?.data?.attributes?.url,
      })
     
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

  // checking profile is owner?
  const isOwner = responseProfileData.userId === user.id 
 




  // update profile 
    // handling control way data
    const handleUpdateChange = (evt) => {
      setUpdateProfileData({
       ...updateProfileData,
        [evt.target.name] : evt.target.value
      })
       setUpdateFile(evt.target.files[0])
       setSubmittedUpdate(false)
    }

    // delete profile image
    const deleteProfileBeforeImage = async () => {
      try {
        setSubmittedDeleteProfileImg(true)
       const deleteResponse = await axiosPrivateInstance(token).delete(`/upload/files/${responseProfileData?.imgId}`)
       setDeleteProfileImg(true)
       setSubmittedDeleteProfileImg(false)
       toast.success('Before profile picture deleted successfully!,now you can upload a new profile picture', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      } catch (err) {
        setSubmittedDeleteProfileImg(true)
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
   
   // update profile image with other data
   const handleUpdate = async (evt) => {
     evt.preventDefault()
     const {firstName,lastName,profilePicture} = updateProfileData
     const data = {
      firstName,
      lastName,
      user : user.id,
     }
    
    try {
      if(firstName || lastName){
        setSubmittedUpdate(true)
        const response = await axiosPrivateInstance(token).put(`/profiles/${responseProfileData?.profileId}`,
         {
           data : data
         },
        )
       setSubmittedUpdate(false)
      }
      if(firstName && lastName){
        setSubmittedUpdate(true)
        const response = await axiosPrivateInstance(token).put(`/profiles/${responseProfileData?.profileId}`,
         {
           data : data
         },
        )
       setSubmittedUpdate(false)
      }
      if(firstName && lastName && updateFile && !responseProfileData?.imgId && !responseProfileData?.profilePicture){
        setSubmittedUpdate(true)
        const formData = new FormData()
        formData.append('files.profilePicture',updateFile,updateFile.name)
        formData.append('data',JSON.stringify(data))
        const response = await axiosPrivateInstance(token).put(`/profiles/${responseProfileData?.profileId}`,
         formData
        )
       setSubmittedUpdate(false)
      }
       toast.success('Profile updated successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
       });
    } catch (err) {
      setSubmittedUpdate(false)
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
  

  return (
    <>
      <div>
        {
         user.id && responseProfileData?.profileId ? '' :  
          <Form className='mb-5' onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor='firstName'>FirstName</Form.Label>
            <Form.Control 
                type='text' 
                isInvalid={errors?.firstName}
                name='firstName'
                id='firstName'
                value={firstName}
                onChange={handleChange}
                placeholder='Enter Your FirstName'
                className='mb-2'
              />
              <span style={{color:'red'}}>{errors?.firstName}</span>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor='lastName'>LastName</Form.Label>
            <Form.Control  
                type='text' 
                isInvalid={errors?.lastName}
                value={lastName}
                name='lastName'
                id='lastName'
                onChange={handleChange}
                placeholder='Enter Your LastName'
                className='mb-2'
              />
               <span style={{color:'red'}}>{errors?.lastName}</span>
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor='profilePicture'>ProfilePicture</Form.Label>
            <Form.Control 
              type='file' 
              isInvalid={errors?.profilePicture}
              accept='image/*'
              value={profilePicture}
              onChange={handleChange}
              name='profilePicture'
              id='profilePicture'
              className='mb-2'
            />
            <span style={{color:'red'}}>{errors?.profilePicture}</span>
          </Form.Group>
          <Button variant='success' type='submit' disabled={submitted} style={{width:'100%',marginTop:'5px',marginBottom:'5px'}}>Submit</Button>
          {submitted && <ProgressBar animated now={nowOne} label={`${nowOne}%`} />}
         </Form>
        }
       

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>User Name</th>
              <th>Email</th>
              <th>User Created</th>
              <th>ImageID</th>
              <th>UserPicture</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              submitted ? <Loader /> : 
              <tr>
                {
                  isOwner && <>
                    <td>{responseProfileData?.profileId}</td>
                    <td>{responseProfileData?.firstName ? responseProfileData?.firstName : 'no name'}</td>
                    <td>{responseProfileData?.lastName ? responseProfileData?.lastName : 'no name'}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.createdAt}</td>
                    <td>{responseProfileData?.imgId}</td>
                    <td><img src={responseProfileData?.profilePicture ? responseProfileData?.profilePicture : NoImage} width={80} height={80} /></td>
                    <td>
                      <Button variant="success" size="md"  onClick={handleShow}>
                          <FaEdit />
                      </Button>
                    </td>
                  </>
                }
                
              </tr>
            }
          </tbody>
        </Table>

        <Modal show={show} onHide={handleClose}  size="md"
           aria-labelledby="contained-modal-title-vcenter"
           centered>
          <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form className='mb-5'>
                <Form.Group>
                  <Form.Label htmlFor='firstName'>FirstName</Form.Label>
                  <Form.Control 
                      type='text' 
                      name='firstName'
                      id='firstName'
                      defaultValue={responseProfileData?.firstName}
                      onChange={handleUpdateChange}
                      placeholder='Enter Your FirstName'
                      className='mb-2'
                    />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor='lastName'>LastName</Form.Label>
                  <Form.Control  
                      type='text' 
                      name='lastName'
                      defaultValue={responseProfileData?.lastName}
                      onChange={handleUpdateChange}
                      id='lastName'
                      placeholder='Enter Your LastName'
                      className='mb-2'
                    />
                </Form.Group>

                <Form.Group>
                  <Form.Label htmlFor='profilePicture'>ProfilePicture</Form.Label>
                  <Form.Control 
                    type='file' 
                    accept='image/*'
                    name='profilePicture'
                    onChange={handleUpdateChange}
                    id='profilePicture'
                    className='mb-2'
                  />
                  {responseProfileData?.imgId && responseProfileData?.profilePicture && <span style={{color:'red'}}>{updateErrorProfile}</span>}
                </Form.Group>
                {
                  isOwner &&  <Row className='mt-3 mb-2'>
                  <Col sm={4}>
                     <img src={responseProfileData?.profilePicture ? responseProfileData?.profilePicture : NoImage} width={80} height={80} />
                     <p>{responseProfileData?.imgId ? 'Before Image' : 'No Image'}</p>
                  </Col>
                  <Col sm={4}>
                     <Button variant='danger' style={{width:'100%'}} disabled={submittedDeleteProfileImg || !responseProfileData?.imgId} onClick={deleteProfileBeforeImage}>
                        {submittedDeleteProfileImg ?  <Spinner animation="border" variant="dark" /> : 'Delete Image'}
                      </Button>
                  </Col>
                </Row>
                }
               
                <Button variant='success' disabled={submittedUpdate} onClick={handleUpdate} type='submit' style={{width:'100%',marginTop:'5px'}}>
                  {submittedUpdate ? <Spinner animation="border" variant="dark" /> : 'Update'}
                </Button>
              </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
  </>
  )
}

export default Profile