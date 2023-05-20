import { useRef } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../Hooks/useFetch';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './Navbar.css'

function NavBar({ setData }) {
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
              <Link to={"/"}><div className='navbar-brand'><img className='logo' src={'/logo.png'}/><span>App reportes</span></div></Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse>
                  <Nav className="me-auto">
                    {/* <Link to={"/test"}>Ir a /test</Link> */}
                    {/* <Nav.Link href="/test">Test</Nav.Link> */}
                    {/* <Nav.Link href="#link">Link</Nav.Link> */}
                    <NavDropdown title="Traer datos" disabled={!setData}>
                        <NavDropdown.Item onClick={async() => setData(await useFetch("/edificios"))}>Edificios</NavDropdown.Item>
                        <NavDropdown.Item onClick={async() => setData(await useFetch("/incidentes"))}>Incidentes</NavDropdown.Item>
                        <NavDropdown.Item onClick={async() => setData(await useFetch("/pisos"))}>Pisos</NavDropdown.Item>
                        <NavDropdown.Item onClick={async() => setData(await useFetch("/aulas"))}>Aulas</NavDropdown.Item>
                        <NavDropdown.Item onClick={async() => setData(await useFetch("/usuarios"))}>Usuarios</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={fetchImg}>Buscar imagen</NavDropdown.Item>
                    </NavDropdown>
                    <div className='buscar-section'>
                        <input className='form-control' disabled={!setData} ref={imgInput} autoComplete='off' placeholder='el-pepe.jpg'/>
                        <Button onClick={fetchImg} disabled={!setData} className='form-control' variant='outline-secondary'>Buscar imagen</Button>
                    </div>
                  </Nav>
              </Navbar.Collapse>
              </Container>
          </Navbar>
        </section>
    );
}

export default NavBar;