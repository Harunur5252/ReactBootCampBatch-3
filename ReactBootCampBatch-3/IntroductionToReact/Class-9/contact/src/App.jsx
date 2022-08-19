import React from 'react'
import { useState } from 'react'
import { Container } from 'react-bootstrap'
import AddContact from './pages/AddContact'
import Contacts from './pages/Contacts'
import Register from './pages/Register'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Header from './layouts/Header'
import Home from './pages/Home'
import EditContact from './pages/EditContact'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer } from 'react-toastify';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import ContactDetails from './pages/ContactDetails'



const initialContacts = [
  {
    id: '1',
    firstName: 'Barbette',
    lastName: 'Pfertner',
    email: 'bpfertner0@drupal.org',
    profession: 'Web Developer',
    gender: 'female',
    image: 'https://randomuser.me/api/portraits/women/75.jpg',
    dateOfBirth: '05/11/2021',
    bio: 'All About me',
  },
  {
    id: '2',
    firstName: 'Ignatius',
    lastName: 'McPhilip',
    email: 'imcphilip1@toplist.cz',
    profession: 'Software Developer',
    gender: 'male',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    dateOfBirth: '04/04/2022',
    bio: 'All About me',
  },
  {
    id: '3',
    firstName: 'Fletch',
    lastName: 'Veel',
    email: 'fveel2@yellowbook.com',
    profession: 'Graphic Designer',
    gender: 'male',
    image: 'https://randomuser.me/api/portraits/men/78.jpg',
    dateOfBirth: '17/05/2022',
    bio: 'All About me',
  },
  {
    id: '4',
    firstName: 'Shawn',
    lastName: 'Lawrenz',
    email: 'slawrenz3@independent.co.uk',
    profession: 'Data entry specialist',
    gender: 'female',
    image: 'https://randomuser.me/api/portraits/women/80.jpg',
    dateOfBirth: '30/07/2022',
    bio: 'All About me',
  },
  {
    id: '5',
    firstName: 'Bucky',
    lastName: 'Casaccio',
    email: 'bcasaccio4@netlog.com',
    gender: 'male',
    profession: 'Data scientist',
    image: 'https://randomuser.me/api/portraits/men/56.jpg',
    dateOfBirth: '21/03/2022',
    bio: 'All About me',
  },
  {
    id: '6',
    firstName: 'Regan',
    lastName: 'Lodford',
    email: 'rlodford5@nbcnews.com',
    profession: 'python Developer',
    gender: 'female',
    image: 'https://randomuser.me/api/portraits/women/81.jpg',
    dateOfBirth: '16/01/2022',
    bio: 'All About me',
  },
  {
    id: '7',
    firstName: 'Hubert',
    lastName: 'Langhorne',
    email: 'hlanghorne6@thetimes.co.uk',
    gender: 'male',
    profession: 'CPA Marketer',
    image: 'https://randomuser.me/api/portraits/men/80.jpg',
    dateOfBirth: '05/02/2022',
    bio: 'All About me',
  },
]


function App() {
  const [contacts,setContacts] = useState(initialContacts)

  // delete contact
  const deleteContact = (id) => {
     const updatedContacts = contacts.filter(contact => contact.id !== id)
     setContacts(updatedContacts)
  }

  // add contact
  const addContact = (contact) => {
      let contactToAdd = {
        id : uuidv4(),
        ...contact
      }
      setContacts([contactToAdd,...contacts])
  }

  // update contact 
   const updateContact = (contactToUpdate,id) => {
    console.log(contactToUpdate,id)
   const updatedContactData =  contacts.map(contact => {
        if(contact.id === id){
           return {
            id,
            ...contactToUpdate
           }
        }else{
           return contact
        }
    })
    setContacts(updatedContactData)
  }

  return (
    <>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          <BrowserRouter>
            <Header />
            <Container style={{width:'800px',margin:'0 auto'}} className='pt-3'>
               <Routes>
                  <Route  path='/' index element={<Home />} />
                  <Route  path='/contacts'            element={<Contacts    contacts={contacts}  deleteContact={deleteContact} />} />
                  <Route  path='/add-contact'         element={<AddContact  addContact={addContact} />} />
                  <Route  path='/edit-contact/:id'    element={<EditContact contacts={contacts} updateContact={updateContact}/>} />
                  <Route  path='/contacts/:id'        element={<ContactDetails contacts={contacts} deleteContact={deleteContact} />} />
                  <Route  path='/register'            element={<Register />} />
                  <Route  path='/login'               element={<Login />} />
                  <Route  path='*'                    element={<NotFound />} />
               </Routes>
            </Container>
          </BrowserRouter>
    </>
  )
}

export default App
