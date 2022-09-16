import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap'
import FormTextInput from '../layouts/FormTextInput'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { axiosPublicInstance } from '../config/axios';
import { toast } from 'react-toastify';

// validation rules for all input fields
const schema = yup.object({
    password: yup.string().required('password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,'Must Contain 6 character,One Uppercase,One Lowercase,One Number and One special case character'),
    passwordConfirmation : yup.string().required('confirm password is required').oneOf([yup.ref('password')],'confirm password does"t match')
})

function ResetPassword() {
    const { register, formState: { errors,isSubmitting }, handleSubmit } = useForm({
        resolver: yupResolver(schema)
    });

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const code = searchParams.get('code')

    const onSubmit = async (data) => {
      try {
         const response = await axiosPublicInstance.post('/auth/reset-password/',{
         code : code,
         password : data.password,
         passwordConfirmation : data.passwordConfirmation
        }) 
        toast.success('Password reset successfully, now you can login with updated password', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate('/login')
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
          <h2 className='text-center text-dark'>Reset Password</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
                <FormTextInput 
                    type='password'
                    name = 'password'
                    register={register}
                    errors={errors}
                    Label='New Password'
                    placeholder='Enter Your New Password'
                />
                <FormTextInput 
                    type='password'
                    name = 'passwordConfirmation'
                    register={register}
                    errors={errors}
                    Label='Confirm Password'
                    placeholder='Enter Confirm Password'
                />
              <Button variant='primary' type='submit' disabled={isSubmitting ? 'disabled' : ''}>
                 Reset Password
              </Button>
          </Form>
        </>
      )
}

export default ResetPassword