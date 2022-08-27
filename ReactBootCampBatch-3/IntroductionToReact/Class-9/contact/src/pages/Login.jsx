import React,{ useContext } from 'react';
import { useForm } from "react-hook-form";
import { Button, Form } from 'react-bootstrap'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import FormTextInput from '../layouts/FormTextInput';
import { AuthContext } from '../context/Auth.Context';

// validation rules for all input fields
const schema = yup.object({
  password: yup.string().required('password is required'),
  email: yup.string().lowercase().required('Email is required').email('Must be valid email')
})


function Login() {
  const { register, formState: { errors,isSubmitting,isSubmitSuccessful }, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });

 const {login} = useContext(AuthContext) 

  // submit form with user login information
  const onSubmit = (data) => {
    // login user
    login({
      identifier : data.email,
      password: data.password
    })
  }

  return (
    <>
      <h2 className='text-center text-dark'>Login</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>
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
          <Button variant='primary' type='submit' disabled={isSubmitting ? 'disabled' : ''}>
             Login
          </Button>
      </Form>
    </>
  )
}

export default Login