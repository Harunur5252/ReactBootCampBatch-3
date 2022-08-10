import React from 'react'
import { useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

export default function AddContact({addContact}) {
    const [contact,setContact] = useState({
        firstName : '',
        lastName : '',
        email : '',
        dateOfBirth : new Date(),
        profession :'',
        bio : '',
        image:'',
        gender :'male'
    })
   
    const handleChange = (evt) => {
       setContact({
          ...contact,
          [evt.target.name] : evt.target.value
       })
    }

    const handleSubmit = (evt) => {
       evt.preventDefault()
       // checking validation own

       // form submitted
       addContact(contact)
       setContact({
         firstName : '',
         lastName : '',
         email : '',
         dateOfBirth : '',
         profession :'',
         bio : '',
         image:'',
         gender :'male'
     })

    }

    const {firstName,lastName,email,dateOfBirth,profession,bio,gender,image} = contact

  return (
    <>
        <h2 className='text-center'>Add Contact</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className='mb-3'>
                <Col sm={3}>
                   <Form.Label htmlFor='firstName' column>First Name</Form.Label>
                </Col>

                <Col sm={9}>
                   <Form.Control 
                        type='text' 
                        name='firstName' 
                        id='firstName' 
                        onChange={handleChange} 
                        value={firstName} 
                        placeholder='Enter Your First Name' 
                   />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3'>
                <Col sm={3}>
                   <Form.Label htmlFor='lastName' column>Last Name</Form.Label>
                </Col>

                <Col sm={9}>
                   <Form.Control 
                        type='text' 
                        name='lastName' 
                        id='lastName' 
                        onChange={handleChange} 
                        value={lastName} 
                        placeholder='Enter Your Last Name' 
                   />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3'>
                <Col sm={3}>
                   <Form.Label htmlFor='email' column>Email Address</Form.Label>
                </Col>

                <Col sm={9}>
                   <Form.Control 
                        type='email' 
                        name='email' 
                        id='email' 
                        onChange={handleChange} 
                        value={email} 
                        placeholder='Enter Your Email' 
                   />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3'>
                <Col sm={3}>
                   <Form.Label htmlFor='profession' column>Profession</Form.Label>
                </Col>

                <Col sm={9}>
                   <Form.Control 
                        type='text' 
                        name='profession' 
                        id='profession' 
                        onChange={handleChange} 
                        value={profession} 
                        placeholder='Enter Your Profession' 
                   />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3'>
                <Col sm={3}>
                   <Form.Label htmlFor='image' column>Profile</Form.Label>
                </Col>

                <Col sm={9}>
                   <Form.Control 
                        type='text' 
                        name='image' 
                        id='image' 
                        onChange={handleChange} 
                        value={image} 
                        placeholder='Enter Link of Your Profile Picture' 
                   />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3'>
                <Col sm={3}>
                   <Form.Label htmlFor='dateOfBirth' column>Date of Birth</Form.Label>
                </Col>

                <Col sm={9}>
                   <Form.Control 
                        type='date' 
                        name='dateOfBirth' 
                        id='dateOfBirth' 
                        onChange={handleChange} 
                        value={dateOfBirth} 
                        placeholder='Enter Your Date of Birth' 
                   />
                </Col>
            </Form.Group>

            <Form.Group as={Row} className='mb-3'>
                <Col sm={3}>
                   <Form.Label htmlFor='bio' column>Bio</Form.Label>
                </Col>

                <Col sm={9}>
                   <Form.Control 
                        as='textArea'
                        type='text' 
                        name='bio' 
                        id='bio' 
                        onChange={handleChange} 
                        value={bio} 
                        placeholder='Enter Your Bio' 
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
                        name='gender' 
                        id='gender' 
                        onChange={handleChange} 
                        value='male'
                        label='Male'
                        checked={gender === 'male'} 
                    />
                </Col>

                <Col xs='auto'>
                   <Form.Check 
                        type='radio' 
                        name='gender' 
                        id='gender' 
                        onChange={handleChange} 
                        value='female'
                        label='Female'
                        checked={gender === 'female'} 
                    />
                </Col>
            </Form.Group>
            <Button variant='primary' size='md' type='submit'>Add Contact</Button>
        </Form>
    </>
  )
}
