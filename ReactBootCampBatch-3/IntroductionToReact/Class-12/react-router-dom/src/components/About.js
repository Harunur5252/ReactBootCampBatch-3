import React from 'react'
import { Card, Col, ListGroup, Row } from 'react-bootstrap'
import {Link,NavLink, useNavigate, useLocation, Outlet} from 'react-router-dom'

function About({company}) {
  const navigate = useNavigate();
  const location = useLocation();
 console.log(location)
  React.useEffect(() => {
    navigate('/about/founder')
  },[])

  return (
    <>
       <Row>
          <h2>About {company}</h2>
          <Col sm={5}>
                <Card style={{ width: '18rem' }}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                        <Link to='company/web' className={location.pathname === '/about/company/web' ? 'active company' : ''}>Company</Link> 
                    </ListGroup.Item>
                    <ListGroup.Item>
                       <Link to='founder' className={location.pathname === '/about/founder' ? 'active company' : ''}>Founder</Link>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
          </Col>

          <Col sm={7}>
             <Outlet />
          </Col>
       </Row>
        
    </>
  )
}

export default About