import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../Hooks/useFetch';
import { Button, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import './Navbar.css'
import useTest from '../Hooks/useTest';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode"
import useUsuario from '../Hooks/useUsuario';
import UserModal from './UserModal';

function NavBar() {
    const [modalShow, setModalShow] = useState(false)
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
    const verUsuario = () => {
        setTest(usuario)
    }
    // ----------------------------------------------
    const handleSuccessLogin = async(credentialResponse) => {
        const { credential } = credentialResponse
        let decodedUser = await jwt_decode(credential)

        // if (decodedUser.email.split('@')[1] !== 'est.ort.edu.ar') {
        //     console.log('no es un mail de ort')
        //     return
        // }

        const dbUser = await useFetch('/usuarios/email/' + decodedUser.email)

        if (dbUser !== undefined) return setUsuario(dbUser)
        
        const newUser = {
            nombre: decodedUser.name,
            apellido: decodedUser.family_name,
            email: decodedUser.email,
            foto: decodedUser.picture,
            esSupervisor: false,
        }
        setUsuario(newUser)
        await useFetch('/usuarios', newUser)
    }

    return (
        <>
            <Navbar bg="light" expand="lg" className='Navbar'>
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
                                <Button onClick={verUsuario} className='form-control navbar-fetch-button' variant='outline-secondary'>Ver usuario</Button>
                            </form>
                        </Nav>
                        {/* q la foto abra un modal para ver la data y reiniciar el usuario */}
                        <Button onClick={() => setUsuario(null)} className='form-control navbar-fetch-button' variant='outline-secondary'>borrar storage</Button>
                        {/* cambiarle el fondo */}
                        {
                            usuario ? 
                            <img className='logo user-foto' src={usuario.foto} onClick={() => setModalShow(true)} /> :
                            <GoogleLogin onSuccess={credentialResponse => handleSuccessLogin(credentialResponse)} />
                        }
                        {/* onError={() => console.log('Login Failed')} */}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <UserModal show={modalShow} setShow={setModalShow} />
        </>
    )
}

export default NavBar;