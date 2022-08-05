import React, { useRef, useState } from 'react'

export default function ControlledForm() {
  // React Form
    // 1) Controlled Component
    
    const [userData,setUserData] = useState({
        firstName : '',
        lastName : '',
        email : '',
        profession : '',
        gender : 'male'
    })  

    const firstNameRef = useRef(null)

    const [errors,setErrors] = useState({
        firstName : '',
        lastName : '',
        email : '',
        profession : '',
    })
    const [submitted,setSubmitted] = useState(false)
 
    const handleChange = (evt) => {
        setUserData({
            ...userData,
            [evt.target.name] : evt.target.value
        })
        setErrors({
            ...errors,
            [evt.target.name] : ''
        })
    }

    const {firstName,lastName,email,profession,gender} = userData
// Note : akoi function ar under a bar bar state update korle react batch update(sob update gula nia akbarei update kore but aikhane last a update hosse) kore. so
    const handleSubmit = (evt) => {
        evt.preventDefault()
        const userErrors = {
            firstName : '',
            lastName : '',
            email : '',
            profession : '',
        }

        firstNameRef.current.focus() // after form submit automatically firstName felid is focused. 

        if(firstName === ''){
            userErrors.firstName = 'firstName is required'
        }
        if(lastName === ''){
            userErrors.lastName = 'lastName is required'
        }

        const regexEmail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

        if(email === '' || !regexEmail.test(email)){
            userErrors.email = 'email is required and must be valid'
        }
        if(profession === ''){
            userErrors.profession = 'profession is required'
        }
        setErrors(userErrors)

        // if any errors occurs then form is not submitted
        if(Object.values(userErrors).some(elm => elm.length > 0)){
          return
        }

        // if form is valid then you can submit
        setSubmitted(true)
        setUserData({
            firstName : '',
            lastName : '',
            email : '',
            profession : '',
            gender : 'male'
        })
    }



    // Note : If we need to deal an input filed from dom directly then we manually can it by uncontrolled way then we can use in input field ref={} and use useRef() hook.
  return (
    <>
        <div>
            {submitted && <h3>Form is successfully submitted</h3>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='firstName' className='name'>FirstName</label>
                    <input type="text" name='firstName' ref={firstNameRef} id="firstName" onChange={handleChange} value={firstName} className='form-control'/>
                </div>
                <p style={{color:'red'}}>
                    {errors.firstName}
                </p>

                <div className='top-space'>
                    <label htmlFor='lastName' className='name'>LastName</label>
                    <input type="text" name='lastName'  id="lastName" onChange={handleChange} value={lastName} className='form-control'/>
                </div>
                <p style={{color:'red'}}>
                    {errors.lastName}
                </p>

                <div className='top-space'>
                    <label htmlFor='email' className='name'>Email</label>
                    <input type="text" name='email'  id="email" onChange={handleChange} value={email} className='form-control'/>
                </div>
                <p style={{color:'red'}}>
                    {errors.email}
                </p>

                <div className='top-space'>
                    <label htmlFor='gender' className='name'>Gender</label>
                    <input type="radio" name='gender'  id="gender" checked={gender === 'male'} onChange={handleChange} value='male'/> Male
                    <input type="radio" name='gender'  id="gender" checked={gender === 'female'} onChange={handleChange} value='female'/> Female
                </div>

                <div className='top-space'>
                <label htmlFor='profession' className='name'>Profession</label>
                   <select id='profession' name='profession' value={profession} onChange={handleChange}>
                      <option disabled selected>select Profession</option> 
                      <option value="webDeveloper">Web Developer</option>
                      <option value="softDeveloper">Software Developer</option>
                      <option value="mobileDeveloper">Mobile Developer</option>
                      <option value="designer">Designer</option>
                      <option value="programmer">Programmer</option>
                   </select>
                </div>
                <p style={{color:'red'}}>
                    {errors.profession}
                </p>

                <div className='top-space'>
                    <input type="submit" className='button' value="Submit" />
                </div>
                
            </form>
           
        </div>
    </>
  )
}
