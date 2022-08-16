import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import {NavLink} from 'react-router-dom'

function Header() {
  return (
    <Navbar bg="dark" variant="dark" expand="sm" sticky="top">
    <Container>
      <NavLink to='home' style={{textDecoration:'none'}}>
        <Navbar.Brand>
          <img src='/logo192.png' width="90" height="50" alt='logo' />
          <span className='brand-title'>&nbsp;&nbsp;হারুনুর রশিদ</span>
        </Navbar.Brand>
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink to="home" className={({isActive}) => isActive ? 'nav-active nav-link nav-item' : 'nav-link nav-item'}>হোম</NavLink>
          <NavLink to="about" className={({isActive}) => isActive ? 'nav-active nav-link nav-item' : 'nav-link nav-item'}>সম্পর্ক</NavLink>
          <NavLink to="contact" className={({isActive}) => isActive ? 'nav-active nav-link nav-item' : 'nav-link nav-item'}>যোগাযোগ</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header