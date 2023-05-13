import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Navbar.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function NavBar({ logo }) {
    return (
        <section className='Navbar'>
          <Navbar bg="light" expand="lg">
              <Container>
              <Link to={"/"}><Navbar.Brand>Logo</Navbar.Brand></Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                      Another action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                      Separated link
                      </NavDropdown.Item>
                  </NavDropdown>
                  </Nav>
              </Navbar.Collapse>
              </Container>
          </Navbar>
        </section>
    );
}

export default NavBar;