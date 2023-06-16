import { useRef } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../Hooks/useFetch';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './Navbar.css'
import useTest from '../Hooks/useTest';

function NavBar() {
    const input = useRef()
    const { setTest } = useTest()
    
    const fetchData = async() => {
        if (!input.current.value) return
        try {
            const data = await useFetch(input.current.value)
            setTest(data)
        }
        catch {
            input.current.placeholder = 'Error 404 😟'
        }
        input.current.value = ''
    }

    return (
          <Navbar bg="light" expand="sm" className='Navbar'>
              <Container>
              {/* <Link to={"/"}><Navbar.Brand>{logo}</Navbar.Brand></Link> */}
              <Link to={"/"}><div className='navbar-brand'><img className='logo' src={'/logo.png'}/><span>App reportes</span></div></Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse>
                  <Nav className="me-auto navbar-collapse">
                    <Link to={"/"}>Home</Link>
                    <Link to={"/form"}>Reportar</Link>
                    <form className='buscar-section' onSubmit={(e) => e.preventDefault()}>
                        {/* hacer q con enter se envie el form pero q no se recargue la pag*/}
                        <input className='form-control' ref={input} autoComplete='off' placeholder='el-pepe.jpg'/>
                        <Button onClick={fetchData} className='form-control' variant='outline-secondary'>Fetch data</Button>
                    </form>
                  </Nav>
              </Navbar.Collapse>
              </Container>
          </Navbar>
    )
}

export default NavBar;