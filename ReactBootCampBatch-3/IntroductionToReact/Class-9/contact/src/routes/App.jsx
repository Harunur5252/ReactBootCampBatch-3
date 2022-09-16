import React, { useState,useContext } from 'react'
import { Container } from 'react-bootstrap'
import AddContact from '../pages/AddContact'
import Contacts from '../pages/Contacts'
import Register from '../pages/Register'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Header from '../layouts/Header'
import Home from '../pages/Home'
import EditContact from '../pages/EditContact'
import { ToastContainer } from 'react-toastify';
import {Routes,Route} from "react-router-dom";
import ContactDetails from '../pages/ContactDetails'
import Dashboard from '../pages/Dashboard'
import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Profile from '../pages/Profile'
import ManagePassword from '../pages/ManagePassword'
import UserContactList from '../pages/UserContactList'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'



function App() {
  return (
    <>
          <ToastContainer
            position="top-right"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          <Header />
          <Container style={{width:'800px',margin:'0 auto'}} className='pt-3'>
              <Routes>
                <Route  path='/' index element={<Home />} />
                <Route  
                  path='/contacts'            
                  element={
                    <PrivateRoute>
                       <Contacts  />
                    </PrivateRoute>
                  } 
                />
                <Route  
                  path='/add-contact'         
                  element={
                    <PrivateRoute>
                      <AddContact   />
                    </PrivateRoute>
                  } 
                />
                <Route  
                  path='/edit-contact/:id'    
                  element={
                    <PrivateRoute>
                       <EditContact />
                    </PrivateRoute>
                  } 
                />
                <Route  
                  path='/contacts/:id'        
                  element={
                    <PrivateRoute>
                       <ContactDetails />
                    </PrivateRoute>
                  } 
                />
                <Route  
                  path='dashboard'           
                  element={
                    <PrivateRoute>
                       <Dashboard />
                    </PrivateRoute>
                  } 
                >
                   <Route index element={<Profile />} />
                   <Route path='profile' element={<Profile />}/>
                   <Route path='manage-password' element={<ManagePassword />} />
                   <Route path='contacts' element={<UserContactList />} />
                </Route>
               
                <Route 
                  path='forgot-password' 
                  element={
                    <PublicRoute>
                      <ForgotPassword />
                    </PublicRoute>
                  } 
                />
                <Route 
                  path='reset-password' 
                  element={
                    <PublicRoute>
                      <ResetPassword />
                    </PublicRoute>
                  } 
                />
                <Route  
                   path='/register'            
                  element={
                    <PublicRoute>
                      <Register />
                    </PublicRoute>
                   }
                 />
                <Route  
                  path='/login'               
                  element={
                    <PublicRoute>
                       <Login />
                    </PublicRoute>
                  } 
                />
                <Route  path='*' element={<NotFound />} />
              </Routes>
          </Container>
    </>
  )
}

export default App
