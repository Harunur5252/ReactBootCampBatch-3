import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ContactForm from '../components/contacts/ContactForm'

function EditContact({contacts,updateContact}) {
  const {id} = useParams()
  const foundContact = contacts.find(contact => contact.id === id)

  return (
     <ContactForm contact = {foundContact} updateContact={updateContact} />
  )
}

export default EditContact