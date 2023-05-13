import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import InputGroup from 'react-bootstrap/InputGroup';

import './Navbar.css'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../Hooks/useFetch';

function NavBar({ setData }) {
    const [logo, setLogo] = useState()
    useEffect(() => async() => setLogo(<img className='logo' src={await useFetch("/img/logo-ort.png")}/>), [])
    const imgInput = useRef()
    const fetchImg = async() => {
        if (!imgInput.current.value) return
        setData(await useFetch("/img/" + imgInput.current.value))
    }
    return (
        <section className='Navbar'>
          <Navbar bg="light" expand="lg">
              <Container>
              {/* <Link to={"/"}><Navbar.Brand>{logo}</Navbar.Brand></Link> */}
              <Link to={"/"}><div className='navbar-brand'>{logo}<span>App reportes</span></div></Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                  {/* <Nav.Link href="#home">Home</Nav.Link> */}
                  {/* <Nav.Link href="#link">Link</Nav.Link> */}
                  <NavDropdown title="Traer datos" id="basic-nav-dropdown">
                      <NavDropdown.Item onClick={async() => setData(await useFetch("/usuarios"))}>Usuarios</NavDropdown.Item>
                      <NavDropdown.Item onClick={async() => setData(await useFetch("/pisos"))}>Pisos</NavDropdown.Item>
                      <NavDropdown.Item onClick={async() => setData(await useFetch("/aulas"))}>Pisos</NavDropdown.Item>
                      <NavDropdown.Item onClick={async() => setData(await useFetch("/usuarios"))}>Pisos</NavDropdown.Item>
                      <NavDropdown.Divider />
                        <input className='form-control' id='select-img' ref={imgInput}/>
                      <NavDropdown.Item onClick={fetchImg}>Buscar</NavDropdown.Item>
                  </NavDropdown>
                  </Nav>
              </Navbar.Collapse>
              </Container>
          </Navbar>
        </section>
    );
}

export default NavBar;