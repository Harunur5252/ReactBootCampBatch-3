import React, { useContext } from 'react'
import Contact from '../components/contacts/Contact'
import { ContactContext } from '../context/Contact.context'

export default function Contacts() {
  const {contacts} = useContext(ContactContext)

  return (
    <>
        <h2 className='text-center'>All Contacts</h2>
        {contacts.map(contact => <Contact key={contact.id} contact={contact} />)}
    </>
  )
}
