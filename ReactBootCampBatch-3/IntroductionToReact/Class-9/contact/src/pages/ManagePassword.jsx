import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Button, Form } from 'react-bootstrap'
import FormTextInput from '../layouts/FormTextInput'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { axiosPrivateInstance, axiosPublicInstance } from '../config/axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth.Context';

// validation rules for all input fields
const schema = yup.object({
    currentPassword:yup.string().required('current password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,'Must Contain 6 character,One Uppercase,One Lowercase,One Number and One special case character'),
    password: yup.string().required('password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,'Must Contain 6 character,One Uppercase,One Lowercase,One Number and One special case character'),
    passwordConfirmation : yup.string().required('confirm password is required').oneOf([yup.ref('password')],'confirm password does"t match')
})

function ManagePassword() {
  const { register, formState: { errors,isSubmitting }, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate()
  const {user,logout} = useContext(AuthContext)

  const onSubmit = async (data) => {
    try {
       const response = await axiosPrivateInstance.post('/auth/change-password/',{
       currentPassword : data.currentPassword,
       password : data.password,
       passwordConfirmation : data.passwordConfirmation
      }) 
      toast.success('Password change successfully,now you can login with new password', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      logout()
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
        <Form onSubmit={handleSubmit(onSubmit)}>
               <FormTextInput 
                    type='password'
                    name = 'currentPassword'
                    register={register}
                    errors={errors}
                    Label='Current Password'
                    placeholder='Enter Your Current Password'
                />
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
                 Change Password
              </Button>
          </Form>
    </>
  )
}

export default ManagePassword