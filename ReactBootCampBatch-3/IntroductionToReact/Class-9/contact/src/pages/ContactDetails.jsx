import React, { useEffect,useState } from 'react'
import { useParams,Link } from 'react-router-dom'
import { Button, Card,ListGroup } from 'react-bootstrap'
import { FaRegTrashAlt,FaEdit } from "react-icons/fa";
import {format} from 'date-fns'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ContactDetails({contacts,deleteContact}) {
    // navigate to which location? 
    const navigate = useNavigate()

    const [contact,setContact] = useState({})
    const {id} = useParams()
    const foundContact = contacts.find(contact => contact.id === id)

    useEffect(() => {
        if(id && foundContact){
            setContact(foundContact)
        }
    },[id])

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
         navigate('/contacts')
    }

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
                    <Card.Link as={Link} to={`/edit-contact/${id}`}>
                       <Button variant="success" size="md">
                           <FaEdit />
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
        
        }
        
    </>
  )
}

export default ContactDetails

