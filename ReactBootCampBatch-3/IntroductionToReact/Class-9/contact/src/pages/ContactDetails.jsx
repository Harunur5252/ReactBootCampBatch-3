import React, { useContext, useEffect,useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import { Button, Card,ListGroup } from 'react-bootstrap'
import { FaRegTrashAlt,FaEdit } from "react-icons/fa";
import {format} from 'date-fns'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ContactContext } from '../context/Contact.context';
import { AuthContext } from '../context/Auth.Context';

function ContactDetails() {

   const {contacts,deleteContact} = useContext(ContactContext) 
   const {user} = useContext(AuthContext)

    // do navigate to which location? 
    const navigate = useNavigate()
    
    const [contact,setContact] = useState({})

    // receiving id from url by useParams() hook(react-router-dom v6)
    const {id} = useParams()
    // finding single contact
    const foundContact = contacts.find(contact => contact.id === +id)

    //initial mount if we get id and foundContact then set foundContact in state based on [id]
    useEffect(() => {
        if(id && foundContact){
            setContact(foundContact)
        }
    },[id])

    // checking details owner
    const isOwner = user.id === foundContact.author.data.id

     // calling deleteContact function for delete data 
    const handleDelete = (id) => {
        deleteContact(id)
    }
    
    // destructuring contact data as object
    const {firstName,lastName,email,gender,bio,profession,image,dateOfBirth} = contact

  return (
    <>
        <h3 className='text-center'>Contacts Details Page</h3>
        {
        Object.keys(contact).length === 0 ? <p>No contact show</p> 
        : 
        <Card className='mb-3'>
          <div className='d-flex'>
              <Card.Img src={image} className='card-image' />
              <Card.Body>
                <Card.Title><span className='text-dark'>{firstName} {lastName}</span></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{profession}</Card.Subtitle>
                <Card.Text>
                  {bio}
                </Card.Text>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Gender : {gender}</ListGroup.Item>
                <ListGroup.Item>Email : {email}</ListGroup.Item>
                <ListGroup.Item>Date of Birth : {dateOfBirth instanceof Object ? format(dateOfBirth,'dd/MM/yyyy') : dateOfBirth}</ListGroup.Item>
              </ListGroup>
                <div className='card-btn mt-3'>
                  {
                    isOwner && 
                    <>
                      <Card.Link as={Link} to={`/edit-contact/${+id}`}>
                        <Button variant="success" size="md">
                            <FaEdit />
                        </Button>
                      </Card.Link>

                      <Card.Link>
                        <Button variant="danger" size="md" onClick={() => handleDelete(id)}>
                            <FaRegTrashAlt />
                        </Button>
                      </Card.Link>
                    </>
                  }
                    
                </div>
              </Card.Body>
          </div>
        </Card>
        
        }
        
    </>
  )
}

export default ContactDetails

