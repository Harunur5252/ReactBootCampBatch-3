import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap'
import { toast } from 'react-toastify';
import FormTextInput from '../layouts/FormTextInput'
import { axiosPublicInstance } from '../config/axios';


// validation rules for all input fields
const schema = yup.object({
    email: yup.string().lowercase().required('Email is required').email('Must be valid email')
})

function ForgotPassword() {
    const { register, formState: { errors,isSubmitting }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async data => {
      try {
        const response =  await axiosPublicInstance.post('/auth/forgot-password/',{
          email: data.email
        })
        toast.success('Email is sent successfully with password reset link', {
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


    return (
        <>
          <h2 className='text-center text-dark'>Forgot Password</h2>
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
              <Button variant='success' type='submit' disabled={isSubmitting ? 'disabled' : ''}>
                 Submit
              </Button>
          </Form>
        </>
      )
}

export default ForgotPassword