import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import ContactForm from '../components/contacts/ContactForm'
import { ContactContext } from '../context/Contact.context'

function EditContact() {
  const {contacts} = useContext(ContactContext)

   // receiving id from url by useParams() hook(react-router-dom v6)
  const {id} = useParams()

  // finding single contact
  const foundContact = contacts.find(contact => contact.id === +id)
  return (
     <ContactForm contact = {foundContact} />
  )
}

export default EditContact