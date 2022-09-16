import React, { useContext,useState,useEffect } from 'react'
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ContactContext } from '../../context/Contact.context';
import FormTextInput from '../../layouts/FormTextInput'
import NoImage from '../../assets/image-not-found.jpg'

// validation rules for all input fields
const schema = yup.object({
   firstName: yup.string().required('FirstName is required').min(3,'FirstName must be 3 or more').max(20,'FirstName must be equal or less than 20'),
   lastName: yup.string().required('LastName is required').min(3,'LastName must be 3 or more').max(20,'LastName must be equal or less than 20'),
   email: yup.string().required('Email is required').email('Must be valid email'),
   bio: yup.string().required('Bio is required').min(10,'Bio must be 10 or more').max(300,'Bio must be equal or less than 300'),
   profession: yup.string().required('Profession is required').oneOf(['developer','designer','marketer']),
   gender: yup.mixed().required('Gender is required').oneOf(['male','female']),
})

export default function ContactForm({contact}) {
   const {addContact,updateContact,submit,contacts,updateContactError,submitUpdate,deleteContactImage,submitDelete} = useContext(ContactContext)
    // handling input name field , errors, submit form 
    const { register, reset, setValue, formState: { errors,isSubmitting,isSubmitSuccessful }, handleSubmit, watch } = useForm({
      resolver: yupResolver(schema)
    });


    // setting edit value or default value in form input filed
    const defaultValue = {
      firstName : contact?.firstName || 'Harun',
      lastName : contact?.lastName || 'Roshid',
      email : contact?.email ||'hroshid695@gmal.com',
      bio : contact?.bio ||'I am Harun',
      profession : contact?.profession ||'developer',
      image : contact?.image ||'https://randomuser.me/api/portraits/men/78.jpg',
      gender : contact?.gender ||'male',
      dateOfBirth : contact?.dateOfBirth && new Date(contact?.dateOfBirth) || new Date()
    }
    const {firstName,lastName,email,bio,profession,image,gender,dateOfBirth} = defaultValue

    // submit data and flush message
    const onSubmit = data => {
      const id = contact?.id
       if(id){
         updateContact(data,id,contact?.imgId)
       }else {
         addContact(data)
       }
    }
    
    // tracking date 
    const [birthYear,setBirthYear] = useState(dateOfBirth ? dateOfBirth : new Date())
    useEffect(() =>{
       setValue('dateOfBirth',birthYear)
    },[birthYear])

    // after form successfully submitting then reset value from input fields
    useEffect(() =>{
       if(isSubmitSuccessful){
         reset({
             firstName : '',
             lastName : '',
             email : '',
             bio : '',
             profession : '',
             gender : 'male',
         })
       }
    },[isSubmitSuccessful])


    // create input form data array
    const formTextInputData = [
      {
         name:'firstName',
         register:register,
         errors:errors,
         Label:'FirstName',
         placeholder:'Enter Your FirstName',
         defaultValue : firstName
      },
      {
         name:'lastName',
         register:register,
         errors:errors,
         Label:'LastName',
         placeholder:'Enter Your LastName',
         defaultValue : lastName
      },
      {
         name:'email',
         register:register,
         errors:errors,
         Label:'Email',
         placeholder:'Enter Your Email Address',
         defaultValue : email
      },
      
      {
         name:'bio',
         register:register,
         errors:errors,
         Label:'Bio',
         placeholder:'Enter Your Bio',
         defaultValue :bio,
         as : 'textarea'
      }
    ]

  return (
    <>
        <h2 className='text-center'>{contact?.id ? 'Edit Contact' : 'Add Contact'}</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
            {formTextInputData.map((inputItem,index) => {
               const {name,register,defaultValue,errors,Label,placeholder,as} = inputItem
                return ( 
                  <FormTextInput 
                     key={index}
                     name = {name}
                     register={register}
                     errors={errors}
                     Label={Label}
                     placeholder={placeholder}
                     defaultValue = {defaultValue}
                     as = {as}
                  />
               )
            })}

            <Form.Group as={Row} className='mb-3'>
                <Col sm={3}>
                   <Form.Label htmlFor='image' column>Profile Picture</Form.Label>
                </Col>

                <Col sm={9}>
                   <Form.Control  
                   type='file'
                   accept='image/*'
                   {...register("image")} 
                   id='image' 
                   />
                </Col>
                {contact?.imgId && <p style={{color:'red'}}>{updateContactError}</p>}
            </Form.Group>
            {
               contact?.id && 
                  <Row>
                     <Col sm={3}>
                        <img src={contact?.image ? contact?.image : NoImage} width={100} height={100} alt='beforeImg' />
                        <p>{contact?.image ? 'Before Image' : 'no image'}</p>
                     </Col>
                     <Col sm={3}>
                        <Button variant='danger' disabled={!contact?.imgId} onClick={() => deleteContactImage(contact?.imgId)}>
                           {submitDelete ? <Spinner animation="border" variant="dark" /> : 'Delete Image'}
                        </Button>
                     </Col>
                  </Row>
            }
           
            <Form.Group as={Row} className='mb-3'>
                <Col sm={3}>
                   <Form.Label htmlFor='profession' column>Profession</Form.Label>
                </Col>

                <Col sm={9}>
                   <Form.Select aria-label='Enter Your Profession' 
                   {...register("profession")} 
                   id='profession' 
                   isInvalid={errors?.profession}
                   defaultValue={profession}
                   >
                       <option value='' disabled>Select Your Profession</option> 
                       <option value='developer'>Developer</option>   
                       <option value='designer'>Designer</option>
                       <option value='marketer'>Marketer</option>  
                   </Form.Select>

                     <Form.Control.Feedback type="invalid">
                        {errors?.profession?.message}
                     </Form.Control.Feedback>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3'>
                <Col sm={3}>
                   <Form.Label htmlFor='dateOfBirth' column>Date of Birth</Form.Label>
                </Col>

                <Col sm={9}>
                     <DatePicker 
                           name='dateOfBirth'
                           id='dateOfBirth'
                           maxDate={new Date()}
                           showYearDropdown
                           selected={birthYear} 
                           onChange={(date) => setBirthYear(date)} 
                     />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3'>
                <Col sm={3}>
                   <Form.Label htmlFor='gender' column>Gender</Form.Label>
                </Col>

                <Col xs='auto'>
                   <Form.Check 
                        type='radio' 
                        id='gender' 
                        value='male'
                        defaultChecked={gender === 'male'}
                        label='Male'
                        {...register("gender")} 
                    />
                </Col>

                <Col xs='auto'>
                   <Form.Check 
                        type='radio'  
                        id='gender' 
                        value='female'
                        label='Female' 
                        defaultChecked={gender === 'female'}
                        {...register("gender")}
                    />
                </Col>
                     <Form.Control.Feedback type="invalid" className='d-block'>
                        {errors?.gender?.message}
                     </Form.Control.Feedback>
            </Form.Group>

            <Button variant='primary' className='mb-3' size='md' type='submit' disabled={submit ? 'disabled' : ''}>
                {submit || submitUpdate ? <Spinner animation="border" variant="dark" /> : contact?.id  ? 'Update Contact' : 'Add Contact'}
            </Button>
        </Form>
    </>
  )
}
