import React, { useState } from 'react'
import { Form,Button } from 'react-bootstrap';

export default function FormDataValidation() {
    const [userData,setUserData] = useState({
        fullName:'',
        userName:'',
        mobileNumber:'',
        validUrl:'',
        slug:'',
        email:'',
        password:'',
        confirmPassword:'',
    })

    const [errors,setErrors] = useState({
        fullName:'',
        userName:'',
        mobileNumber:'',
        validUrl:'',
        slug:'',
        email:'',
        password:'',
        confirmPassword:'',
    })

    const [submitted,setSubmitted] = useState(false)

    const {fullName,userName,mobileNumber,validUrl,slug,email,password,confirmPassword} = userData

  const handleChange = (evt) => {
    setUserData({
        ...userData,
        [evt.target.name] : evt.target.value
    })
    setErrors({
        ...errors,
        [evt.target.name]:''
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    const userDataErrors = {
        fullName:'',
        userName:'',
        mobileNumber:'',
        validUrl:'',
        slug:'',
        email:'',
        password:'',
        confirmPassword:'',
    }
    if(fullName === ''){
        userDataErrors.fullName = 'firstName is required'
    }
    if(userName === ''){
        userDataErrors.userName = 'userName is required'
    }
    const validMobileRegex = /\+?(\(?88\)?)?\d{11}/gi
    if(mobileNumber === ''){
        userDataErrors.mobileNumber = 'mobile number is required'
    }else if(!validMobileRegex.test(mobileNumber.trim())){
        userDataErrors.mobileNumber = 'mobile number is invalid'
    }
    const validUrlRegex = /(http(s)?)?[\S]?(:)?[\S]?(\/\/)?[\S]?(www)?[\S]?(\.)?[\S]?[\w-_]{2,20}[\S]?\.[a-z]{2,10}(\.bd)?/gi
    if(validUrl === ''){
        userDataErrors.validUrl = 'validUrl is required'
    }else if(!validUrlRegex.test(validUrl.trim())){
        userDataErrors.validUrl = 'url is invalid'
    }
    if(slug === ''){
        userDataErrors.slug = 'slug is required'
    }
    const validEmailRegex = /[a-z]{2,5}[\S]?([\d]{2,4})?(\.?-?_?)([a-z]{2,4})?@[\S]?[a-z]{2,5}([\d]{2,4})?(_?)([\S]?)\.[\S]?[a-z]{2,3}/gi
    if(email === ''){
        userDataErrors.email = 'email is required'
    }else if(!validEmailRegex.test(email.trim())){
        userDataErrors.email = 'email must be valid'
    }
    if(password === ''){
        userDataErrors.password = 'password is required'
    }
    if(confirmPassword === ''){
        userDataErrors.confirmPassword = 'confirmPassword is required'
    }
    setErrors(userDataErrors)

    if(Object.values(userDataErrors).some(elm => elm.length > 0)){
        return 
    }
    setSubmitted(true)

  }


  return (
    <>
        {
            submitted ? <h3 className='form-heading'>Successfully submitted</h3>  : <Form className='formInput' onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="formBasicFullName">
                <Form.Label>FullName</Form.Label>
                <Form.Control type="text" name='fullName' onChange={handleChange} value={fullName} placeholder="FullName" />
                <span style={{color:'red'}}>{errors.fullName}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUserName">
                <Form.Label>UserName</Form.Label>
                <Form.Control type="text"  name='userName' onChange={handleChange} value={userName} placeholder="UserName" />
                <span style={{color:'red'}}>{errors.userName}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMobileNumber">
                <Form.Label>MobileNumber</Form.Label>
                <Form.Control type="text" name='mobileNumber' onChange={handleChange} value={mobileNumber} placeholder="MobileNumber" />
                <span style={{color:'red'}}>{errors.mobileNumber}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicValidUrl">
                <Form.Label>ValidUrl</Form.Label>
                <Form.Control type="text" name='validUrl' onChange={handleChange} value={validUrl} placeholder="ValidUrl" />
                <span style={{color:'red'}}>{errors.validUrl}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicSlug">
                <Form.Label>Slug</Form.Label>
                <Form.Control type="text" name='slug' onChange={handleChange} value={slug} placeholder="Slug" />
                <span style={{color:'red'}}>{errors.slug}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' onChange={handleChange} value={email} placeholder="Enter email" />
                <Form.Text className="text-muted">
                     We'll never share your email with anyone else.
                </Form.Text><br />
                <span style={{color:'red'}}>{errors.email}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name='password' onChange={handleChange} value={password} placeholder="Password" />
                <span style={{color:'red'}}>{errors.password}</span>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>ConfirmPassword</Form.Label>
                <Form.Control type="password" name='confirmPassword' onChange={handleChange} value={confirmPassword} placeholder="ConfirmPassword" />
                <span style={{color:'red'}}>{errors.confirmPassword}</span>
            </Form.Group>

            <div className="d-grid gap-2">
                <Button className='mb-5 btn btn-success' type="submit">
                    Submit
                </Button>
            </div>
        </Form>
        }
        
    </>
  )
}
