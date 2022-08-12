import React from 'react'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useEffect } from 'react';

// validation rules for all input fields
const schema = yup.object({
   firstName: yup.string().required('FirstName is required').min(3,'FirstName must be 3 or more').max(20,'FirstName must be equal or less than 20'),
   lastName: yup.string().required('LastName is required').min(3,'LastName must be 3 or more').max(20,'LastName must be equal or less than 20'),
   email: yup.string().required('Email is required').email('Must be valid email'),
   bio: yup.string().required('Bio is required').min(10,'Bio must be 10 or more').max(300,'Bio must be equal or less than 300'),
   profession: yup.string().required('Profession is required').min(3,'Profession must be 3 or more').max(20,'Profession must be equal or less than 20'),
   image: yup.string().required('Image url is required').url('Image url must be valid'),
   gender: yup.mixed().required('Gender is required').oneOf(['male','female']),
})

export default function AddContact({addContact}) {

    // handling input name field , errors, submit form 
    const { register, reset, setValue, formState: { errors,isSubmitting,isSubmitSuccessful }, handleSubmit, watch } = useForm({
      resolver: yupResolver(schema)
    });
    const onSubmit = data => {console.log(data)}
    
    // tracking date 
    const [birthYear,setBirthYear] = useState(new Date())
    useEffect(() =>{
       setValue('dateOfBirth',birthYear)
    },[birthYear])

    // after form successfully submitting then reset value on input fields
    useEffect(() =>{
       if(isSubmitSuccessful){
         reset({
             firstName : '',
             lastName : '',
             email : '',
             bio : '',
             profession : '',
             image : '',
             gender : 'male',
         })
       }
    },[isSubmitSuccessful])


  return (
    <>
        <h2 className='text-center'>Add Contact</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group as={Row} className='mb-3'>
                <Col sm={3}>
                   <Form.Label htmlFor='firstName' column>First Name</Form.Label>
                </Col>

                <Col sm={9}>
                   <Form.Control 
                        type='text'  
                        id='firstName' 
                        defaultValue=''
                        {...register("firstName")} 
                        isInvalid={errors?.firstName}
                        placeholder='Enter Your First Name' 
                   />
                     <Form.Control.Feedback type="invalid">
                        {errors?.firstName?.message}
                     </Form.Control.Feedback>
                </Col>
            </Form.Group>

             <Form.Group as={Row} className='mb-3'>
                <Col sm={3}>
                   <Form.Label htmlFor='lastName' column>Last Name</Form.Label>
                </Col>

                <Col sm={9}>
                   <Form.Control 
                        type='text'  
                        id='lastName' 
                        defaultValue=''
                        {...register("lastName")} 
                        isInvalid={errors?.lastName}
                        placeholder='Enter Your Last Name' 
                   />
                     <Form.Control.Feedback type="invalid">
                        {errors?.lastName?.message}
                     </Form.Control.Feedback>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3'>
                <Col sm={3}>
                   <Form.Label htmlFor='email' column>Email Address</Form.Label>
                </Col>

                <Col sm={9}>
                   <Form.Control 
                        type='email' 
                        id='email' 
                        defaultValue=''
                        {...register("email")} 
                        isInvalid={errors?.email}
                        placeholder='Enter Your Email' 
                   />
                     <Form.Control.Feedback type="invalid">
                        {errors?.email?.message}
                     </Form.Control.Feedback>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3'>
                <Col sm={3}>
                   <Form.Label htmlFor='profession' column>Profession</Form.Label>
                </Col>

                <Col sm={9}>
                   <Form.Control 
                        type='text' 
                        id='profession' 
                        defaultValue=''
                        {...register("profession")} 
                        isInvalid={errors?.profession}
                        placeholder='Enter Your Profession' 
                   />
                     <Form.Control.Feedback type="invalid">
                        {errors?.profession?.message}
                     </Form.Control.Feedback>
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3'>
                <Col sm={3}>
                   <Form.Label htmlFor='image' column>Profile</Form.Label>
                </Col>

                <Col sm={9}>
                   <Form.Control 
                        type='text' 
                        id='image' 
                        defaultValue=''
                        {...register("image")} 
                        isInvalid={errors?.image}
                        placeholder='Enter Your Profile Picture' 
                   />
                     <Form.Control.Feedback type="invalid">
                        {errors?.image?.message}
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
                   <Form.Label htmlFor='bio' column>Bio</Form.Label>
                </Col>

                <Col sm={9}>
                   <Form.Control 
                        as='textarea'
                        type='text' 
                        id='bio' 
                        defaultValue=''
                        {...register("bio")} 
                        isInvalid={errors?.bio}
                        placeholder='Enter Your Bio' 
                   />
                     <Form.Control.Feedback type="invalid">
                        {errors?.bio?.message}
                     </Form.Control.Feedback>
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
                        {...register("gender")}
                    />
                </Col>
                     <Form.Control.Feedback type="invalid" className='d-block'>
                        {errors?.gender?.message}
                     </Form.Control.Feedback>
            </Form.Group> 
            <Button variant='primary' size='md' type='submit' disabled={isSubmitting ? 'disabled' : ''}>Add Contact</Button>
        </Form>
    </>
  )
}
