import React, { useContext } from 'react'
import { Button, Card,ListGroup } from 'react-bootstrap'
import { FaEye,FaRegTrashAlt,FaEdit } from "react-icons/fa";
import {format} from 'date-fns' // datePicker package behind the scene use date-fns package. when we install datePicker then automatically install date-fans package.It's use for date formate and so on.
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { ContactContext } from '../../context/Contact.context';


export default function Contact({contact}) {
  const {firstName,lastName,email,profession,gender,image,dateOfBirth,bio,id} = contact
  const {deleteContact} = useContext(ContactContext)

  // call deleteContact function for delete data
  const handleDelete = (id) => {
      toast.success("contact is deleted successfully !", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
     deleteContact(id)
  }
  
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

                    <Card.Link>
                       <Button variant="danger" size="md" onClick={() => handleDelete(id)}>
                           <FaRegTrashAlt />
                      </Button>
                    </Card.Link>
                </div>
              </Card.Body>
          </div>
      </Card>
  )
}
