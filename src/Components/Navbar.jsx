import { useRef } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../Hooks/useFetch';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './Navbar.css'
import useTest from '../Hooks/useTest';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode"
import useUsuario from '../Hooks/useUsuario';

function NavBar() {
    const input = useRef()
    const { setTest } = useTest()
    const { usuario, setUsuario } = useUsuario()

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
    // ----------------------------------------------
    const handleSuccessLogin = async(credentialResponse) => {
        const { clientId, credential } = credentialResponse
        let user = jwt_decode(credential)
        console.log(user)
        if (user.email.split('@')[1] !== 'est.ort.edu.ar') {
            console.log('no es un mail de ort')
            return
        }
        // const isRegistered = await useFetch('/usuarios/email/' + user.email)
        // esSupervisor
        // if (!isRegistered) newUser.email = user.email

        // setUsuario(newUser)
    }

    return (
        <Navbar bg="light" expand="md" className='Navbar'>
            <Container>
                <Link to={"/"}><div className='navbar-brand'><img className='logo' src={'/logo.png'} /><span>App reportes</span></div></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="me-auto navbar-collapse">
                        <Link to={"/"}>Home</Link>
                        <Link to={"/form"}>Reportar</Link>
                        <form className='buscar-section' onSubmit={(e) => e.preventDefault()}>
                            {/* hacer q con enter se envie el form pero q no se recargue la pag*/}
                            <input className='form-control navbar-fetch-input' ref={input} autoComplete='off' placeholder='/img/el-pepe.jpg' defaultValue={'/img/el-pepe.jpg'} />
                            <Button onClick={fetchData} className='form-control navbar-fetch-button' variant='outline-secondary'>Fetch data</Button>
                        </form>
                        <GoogleLogin 
                            onSuccess={credentialResponse => handleSuccessLogin(credentialResponse)}
                            onError={() => console.log('Login Failed')}
                        />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar;