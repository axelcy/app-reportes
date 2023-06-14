import { useRef } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../Hooks/useFetch';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './Navbar.css'
import useTest from '../Hooks/useTest';

function NavBar({ setData }) {
    const imgInput = useRef()
    const { setTest } = useTest()
    
    const fetchData = async() => {
        if (!imgInput.current.value) return
        try {
            const data = await useFetch('/' + imgInput.current.value)
            setTest(data)
        }
        catch {
            imgInput.current.placeholder = 'Error 404 😟'
        }
        imgInput.current.value = ''
    }

    return (
          <Navbar bg="light" expand="lg" className='Navbar'>
              <Container>
              {/* <Link to={"/"}><Navbar.Brand>{logo}</Navbar.Brand></Link> */}
              <Link to={"/"}><div className='navbar-brand'><img className='logo' src={'/logo.png'}/><span>App reportes</span></div></Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse>
                  <Nav className="me-auto">
                    {/* <Link to={"/test"}>Ir a /test</Link> */}
                    {/* <Nav.Link href="/test">Test</Nav.Link> */}
                    {/* <Nav.Link href="#link">Link</Nav.Link> */}
                    <div className='buscar-section'>
                        <input className='form-control' disabled={!setData} ref={imgInput} autoComplete='off' placeholder='el-pepe.jpg'/>
                        <Button onClick={fetchData} disabled={!setData} className='form-control' variant='outline-secondary'>Buscar imagen</Button>
                    </div>
                  </Nav>
              </Navbar.Collapse>
              </Container>
          </Navbar>
    )
}

export default NavBar;