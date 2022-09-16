import React, { useContext,useEffect } from 'react'
import Contact from '../components/contacts/Contact'
import Loader from '../components/Loader'
import { AuthContext } from '../context/Auth.Context'
import { ContactContext } from '../context/Contact.context'

export default function Contacts() {
  const {contacts,loader} = useContext(ContactContext)

  return (
    <>
        <h2 className='text-center'>All Contacts</h2>
        {loader ? contacts.map(contact => <Contact key={contact.id} contact={contact} />) : <Loader />}
    </>
  )
}
