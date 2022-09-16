import React,{ useContext,useEffect } from 'react'
import { Table,Button, Spinner } from 'react-bootstrap'
import { FaRegTrashAlt,FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import {AuthContext} from '../context/Auth.Context'
import {ContactContext} from '../context/Contact.context'

function UserContactList() {
  const {user,token,userContacts,loaded,userContactDelete,userContactsLoaded,loadedUserContact} = useContext(AuthContext)

  useEffect(() => {
    if(user && token){
     (async () => {
         await loadedUserContact()
     })()
    }
 },[user,token,userContactsLoaded])
 
  return (
    <>
      {
        loaded ?    
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th width={10}>First Name</th>
            <th width={10}>Last Name</th>
            <th width={10}>Email</th>
            <th width={40}>Bio</th>
            <th width={10}>Profession</th>
            <th width={30}>Image</th>
          </tr>
        </thead>
        <tbody>
         {userContacts.map((userContact) => {
           return(
              <tr key={userContact.id}>
                <td>{userContact.id}</td>
                <td>{userContact.firstName}</td>
                <td>{userContact.lastName}</td>
                <td>{userContact.email}</td>
                <td>{userContact.bio}</td>
                <td>{userContact.profession}</td>
                <td><img  src={userContact.image} alt='userContactImage' height={100} width={100} /></td>
                <td>
                  <Button variant="danger" size="md" onClick={() => userContactDelete(userContact.id)}>
                     <FaRegTrashAlt />
                  </Button>
                </td>
                <td>
                  <Button variant="success" size="md" as={Link} to={`/edit-contact/${userContact.id}`}>
                     <FaEdit />
                  </Button>
                </td>
              </tr>
           )
         })}
        </tbody>
        </Table>
        :
        <Loader />
      }
    </>
  )
}

export default UserContactList