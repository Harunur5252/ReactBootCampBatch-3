import React, { useContext,useEffect } from 'react'
import { Button, Card,ListGroup } from 'react-bootstrap'
import { FaEye,FaRegTrashAlt,FaEdit } from "react-icons/fa";
import {format} from 'date-fns' // datePicker package behind the scene use date-fns package. when we install datePicker then automatically install date-fans package.It's use for date formate and so on.
import { Link } from 'react-router-dom';
import { ContactContext } from '../../context/Contact.context';
import { AuthContext } from '../../context/Auth.Context';


export default function Contact({contact}) {
  const {firstName,lastName,email,profession,gender,image,dateOfBirth,bio,id,imgId} = contact
  const {deleteContact} = useContext(ContactContext)
  const {user} = useContext(AuthContext)

  // call deleteContact function for delete data
  const handleDelete = (id,imgId) => {
     deleteContact(id,imgId)
  }
  
  // check owner of the contact
  const isOwner = user.id === contact?.author?.data?.id
 
  
  return (
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
                    <Card.Link as={Link} to={`/contacts/${id}`}>
                       <Button variant="warning" size="md">
                           <FaEye />
                       </Button>
                    </Card.Link>
                   {
                    isOwner && 
                    <Card.Link>
                       <Button variant="danger" size="md" onClick={() => handleDelete(id,imgId)}>
                           <FaRegTrashAlt />
                      </Button>
                    </Card.Link>
                   }
                    
                </div>
              </Card.Body>
          </div>
        </Card>
  )
}
