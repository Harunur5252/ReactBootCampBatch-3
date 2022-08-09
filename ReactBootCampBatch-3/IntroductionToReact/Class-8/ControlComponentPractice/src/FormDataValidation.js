import React from 'react'
import { Form,Button } from 'react-bootstrap';

export default function FormDataValidation({handleChange,userData,errors,handleSubmit,loading,submitted}) {

  const {fullName,userName,mobileNumber,validUrl,email,password,confirmPassword} = userData

  return (
    <>
        {
            submitted ? <h3 className='form-submit'>Successfully submitted</h3>  
            : 
            <Form className='formInput' onSubmit={handleSubmit} noValidate>
                <Form.Group className="mb-3" controlId="formBasicFullName">
                    <Form.Label>FullName</Form.Label>
                    <Form.Control type="text" name='fullName' className={errors.fullName ? 'error-class' : 'success-class'} onChange={handleChange} value={fullName} placeholder="FullName" />
                    <span style={{color:'red'}}>{errors.fullName}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUserName">
                    <Form.Label>UserName</Form.Label>
                    <Form.Control type="text"  name='userName' className={errors.userName ? 'error-class' : 'success-class'} onChange={handleChange} value={userName} placeholder="UserName" />
                    <span style={{color:'red'}}>{errors.userName}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicMobileNumber">
                    <Form.Label>MobileNumber</Form.Label>
                    <Form.Control type="text" name='mobileNumber' className={errors.mobileNumber ? 'error-class' : 'success-class'} onChange={handleChange} value={mobileNumber} placeholder="MobileNumber" />
                    <span style={{color:'red'}}>{errors.mobileNumber}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicValidUrl">
                    <Form.Label>ValidUrl</Form.Label>
                    <Form.Control type="text" name='validUrl' className={errors.validUrl ? 'error-class' : 'success-class'} onChange={handleChange} value={validUrl} placeholder="ValidUrl" />
                    <span style={{color:'red'}}>{errors.validUrl}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>EmailAddress</Form.Label>
                    <Form.Control type="email" name='email' className={errors.email ? 'error-class' : 'success-class'} onChange={handleChange} value={email} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text><br />
                    <span style={{color:'red'}}>{errors.email}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' className={errors.password ? 'error-class' : 'success-class'} onChange={handleChange} value={password} placeholder="Password" />
                    <span style={{color:'red'}}>{errors.password}</span>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>ConfirmPassword</Form.Label>
                    <Form.Control type="password" name='confirmPassword' className={errors.confirmPassword ? 'error-class' : 'success-class'} onChange={handleChange} value={confirmPassword} placeholder="ConfirmPassword" />
                    <span style={{color:'red'}}>{errors.confirmPassword}</span>
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button className='mb-5 btn btn-success' type="submit">
                        {loading ? 'Loading....' : 'Submit'}
                    </Button>
                </div>
            </Form>
        }
        
    </>
  )
}
