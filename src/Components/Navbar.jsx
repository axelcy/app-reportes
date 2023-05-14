import './Navbar.css'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../Hooks/useFetch';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';

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
              <Navbar.Collapse>
                  <Nav className="me-auto">
                    {/* <Link to={"/test"}>Ir a /test</Link> */}
                    {/* <Nav.Link href="/test">Test</Nav.Link> */}
                    {/* <Nav.Link href="#link">Link</Nav.Link> */}
                    <NavDropdown title="Traer datos">
                        <NavDropdown.Item onClick={async() => setData(await useFetch("/edificios"))}>Edificios</NavDropdown.Item>
                        <NavDropdown.Item onClick={async() => setData(await useFetch("/pisos"))}>Pisos</NavDropdown.Item>
                        <NavDropdown.Item onClick={async() => setData(await useFetch("/aulas"))}>Aulas</NavDropdown.Item>
                        <NavDropdown.Item onClick={async() => setData(await useFetch("/usuarios"))}>Usuarios</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={fetchImg}>Buscar imagen</NavDropdown.Item>
                    </NavDropdown>
                    <div className='buscar-section'>
                        <input className='form-control' ref={imgInput} autoComplete='off' placeholder='el-pepe.jpg'/>
                        <Button onClick={fetchImg} className='form-control' variant='outline-secondary'>Buscar imagen</Button>
                    </div>
                  </Nav>
              </Navbar.Collapse>
              </Container>
          </Navbar>
        </section>
    );
}

export default NavBar;