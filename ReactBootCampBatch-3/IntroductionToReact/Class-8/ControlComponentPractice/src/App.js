import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import FormDataValidation from './FormDataValidation';

function App() {
  /*
     Email Validation : 

     /[a-z]{2,5}[\S]?([\d]{2,4})?(\.?-?_?)([a-z]{2,4})?@[\S]?[a-z]{2,5}([\d]{2,4})?(_?)([\S]?)\.[\S]?[a-z]{2,3}/gi

      samim@gmail.com
      admin@web.net
      samim_info@gmail.com
      samim-_@gmail.com
      samim2334@gmail23.com
      samim@harun_.bd
      123@gmail.com
      asa45@gmai.com
      sa@gmail.com

      url validation

      /(http(s)?)?[\S]?(:\/\/)?[\S]?(www)?[\S]?(\.)?[\S]?[\w-_]{2,20}[\S]?\.[a-z]{2,10}(\.bd)?/gi

      https://webdeveloper.net
      http://webdeveloper.net
      http://www.webdeveloper.net
      https://www.nu.ac.bd
      www.webdeveloper.net
      webdeveloper.net
      web_developer.net
      web-developer.net

      phone validation

      /\+?(\(?88\)?)?\d{11}/gi

      01759995363
      8801307216770
      +8801795349786
      (88)01759995363
      
  */

   // initial user data for tracking
   const [userData,setUserData] = useState({
         fullName:'',
         userName:'',
         mobileNumber:'',
         validUrl:'',
         email:'',
         password:'',
         confirmPassword:'',
   })

   // initial user errors data for tracking
   const [errors,setErrors] = useState({
      fullName:'',
      userName:'',
      mobileNumber:'',
      validUrl:'',
      email:'',
      password:'',
      confirmPassword:'',
   })
   
   // for avoiding react batch update, we have set some initial user errors data
   const userDataErrors = {
      fullName:'',
      userName:'',
      mobileNumber:'',
      validUrl:'',
      email:'',
      password:'',
      confirmPassword:'',
   }

  // for tracking loading animation, data submitted,text change 
  const [loading,setLoading] = useState(false)
  const [submitted,setSubmitted] = useState(false)
  const [text,setText] = useState(true)

  // user can change data in form
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
 const {fullName,userName,mobileNumber,validUrl,email,password,confirmPassword} = userData

 // If user give errors data format then it's check
 const formErrorHandle = () => {

   const fullNameRegex = /^[a-z_-]{5,15}$/gi
   if(fullName === ''){
       userDataErrors.fullName = 'fullName is required'
   }else if(!fullNameRegex.test(fullName)){
       userDataErrors.fullName = 'fullName is invalid'
   }
   
   const userNameRegex = /^[\w-.]{4,15}$/gi
   if(userName === ''){
       userDataErrors.userName = 'userName is required'
   }else if(!userNameRegex.test(userName)){
       userDataErrors.userName = 'userName is invalid'
   }
   
   const validMobileRegex = /^\+?(\(?88\)?)?\d{11}$/g
   if(mobileNumber === ''){
       userDataErrors.mobileNumber = 'mobile number is required'
   }else if(!validMobileRegex.test(mobileNumber.trim())){
       userDataErrors.mobileNumber = 'mobile number is invalid'
   } 
   
   const validUrlRegex = /(http(s)?)?[\S]?(:)?[\S]?(\/\/)?[\S]?(www)?[\S]?(\.)?[\S]?[\w-_]{2,20}[\S]?\.[\S]?[a-z]{2,10}(\.bd)?/gi
   if(validUrl === ''){
       userDataErrors.validUrl = 'valid url is required'
   }else if(!validUrlRegex.test(validUrl.trim())){
       userDataErrors.validUrl = 'url is invalid'
   }
    
   const validEmailRegex = /[a-z]{2,5}[\S]?([\d]{2,4})?(\.?-?_?)([a-z]{2,4})?@[\S]?[a-z]{2,5}([\d]{2,4})?(_?)([\S]?)\.[\S]?[a-z]{2,3}/gi
   
   if(email === ''){
       userDataErrors.email = 'email is required'
   }else if(!validEmailRegex.test(email.trim())){
       userDataErrors.email = 'email must be valid'
   }
    
   const passwordRegex = /^[\w@#\$%\^&\*]{10}$/gi
   if(password === ''){
       userDataErrors.password = 'password is required'
   }else  if(!passwordRegex.test(password)){
       userDataErrors.password = 'password is invalid'
   }
  
   if(confirmPassword === ''){
       userDataErrors.confirmPassword = 'confirm password is required'
   }
   if(confirmPassword !== password){
       userDataErrors.confirmPassword = 'confirm password is not matched'
   }
   setErrors(userDataErrors)
 }

 // data successfully submitted
 const handleSubmit = (evt) => {
   evt.preventDefault()

   // from validation for valid format data
   formErrorHandle()

   // if any error occur then it's called
   if(Object.values(userDataErrors).some(elm => elm.length > 0)){
       return 
   }

   // when data is ready to  submit then it's take 1.2s to submit.  
   setTimeout(() => {
       setSubmitted(true)
       setText(false)
   },1200)
   setLoading(true)
 }

  return(
    <>
       <div>
          <h3 className='form-heading'>{text && 'Form Validation'}</h3>
          <FormDataValidation  handleChange={handleChange} userData={userData} errors={errors} handleSubmit={handleSubmit} loading={loading} submitted={submitted}  />
       </div>
    </>
  )
}

export default App;
