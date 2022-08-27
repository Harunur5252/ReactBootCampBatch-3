import React,{ useContext } from 'react';
import { useForm } from "react-hook-form";
import { Button, Form } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormTextInput from '../layouts/FormTextInput';
import { AuthContext } from '../context/Auth.Context';

// validation rules for all input fields
const schema = yup.object({
  username: yup.string().required('userName is required').min(5,'userName must be 5 or more').max(20,'userName must be equal or less than 20'),
  password: yup.string().required('password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,'Must Contain 6 character,One Uppercase,One Lowercase,One Number and One special case character'),
  email: yup.string().lowercase().required('Email is required').email('Must be valid email'),
  confirmPassword : yup.string().required('confirm password is required').oneOf([yup.ref('password')],'confirm password does"t match')
})


function Register() {
  const { register, reset, setValue, formState: { errors,isSubmitting,isSubmitSuccessful }, handleSubmit, watch } = useForm({
    resolver: yupResolver(schema)
  });

 const {registerUser} = useContext(AuthContext) 

  // submit form with user register information
  const onSubmit = (data) => {
    // registering user
    registerUser({
      username : data.username,
      email : data.email,
      password: data.password
    })
  }

  return (
    <>
      <h2 className='text-center text-dark'>Register</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
          <FormTextInput 
              name = 'username'
              register={register}
              errors={errors}
              Label='UserName'
              placeholder='Enter Your User Name'
              defaultValue = 'Harun'
          />
          <FormTextInput 
              type='email'
              name = 'email'
              register={register}
              errors={errors}
              Label='Email'
              placeholder='Enter Your Email Address'
              defaultValue = 'hroshid695@gmail.com'
          />
          <FormTextInput 
              type='password'
              name = 'password'
              register={register}
              errors={errors}
              Label='Password'
              placeholder='Enter Your Password'
              defaultValue = 'abcdefF1@'
          />
          <FormTextInput 
              type='password'
              name = 'confirmPassword'
              register={register}
              errors={errors}
              Label='Confirm Password'
              placeholder='Enter Confirm Password'
              defaultValue = 'abcdefF1@'
          />
          <Button variant='primary' type='submit' disabled={isSubmitting ? 'disabled' : ''}>
             Register
          </Button>
      </Form>
    </>
  )
}

export default Register