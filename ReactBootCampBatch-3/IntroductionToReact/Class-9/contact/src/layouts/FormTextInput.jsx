import React from 'react'
import {Form,Row,Col} from 'react-bootstrap'

function FormTextInput({name,type = 'text',register,errors,Label,placeholder,defaultValue,...rest}) {

  return (
    <Form.Group as={Row} className='mb-3'>
        <Col sm={3}>
            <Form.Label htmlFor={name} column>{Label}</Form.Label>
        </Col>

        <Col sm={9}>
            <Form.Control 
                    type={type}  
                    id={name} 
                    defaultValue={defaultValue}
                    {...register(name)} 
                    isInvalid={errors?.name}
                    placeholder={placeholder}
                    {...rest}
            />
            <Form.Control.Feedback type="invalid">
                {errors[name]?.message}
            </Form.Control.Feedback>
        </Col>
    </Form.Group>
  )
}

export default FormTextInput


