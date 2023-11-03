import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../Hooks/useFetch';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import './Navbar.css'
import useFooter from '../Hooks/useFooter';
import useUsuario from '../Hooks/useUsuario';
import UserModal from './UserModal';
import LogInButton from './LogInButton';

function NavBar() {
    const [modalShow, setModalShow] = useState(false)
    const input = useRef()
    const { setFooter } = useFooter()
    const { usuario, setUsuario } = useUsuario()

    const fetchData = async() => {
        if (!input.current.value) return
        try {
            const data = await useFetch(input.current.value)
            setFooter(data)
        }
        catch {
            input.current.placeholder = 'Error 404 😟'
        }
        input.current.value = ''
    }
    const verUsuario = () => setFooter(usuario)

    return (
        <>
            <Navbar bg="light" expand="lg" className='Navbar'>
                <Container>
                    <Link to={"/"}><div className='navbar-brand'><img className='logo' alt='logo' src={'./logo-resuelve.png'} /></div></Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="me-auto navbar-collapse">
                            <Link to={"/"}>Home</Link>
                            <Link to={"/reportar"}>Reportar</Link>
                            { usuario && <Link to={"/mis-reportes"}>Mis reportes</Link> }
                            { usuario?.esSupervisor !== 0 && <Link to={"/ver-reportes"}>Ver reportes</Link> }
                            {/* <Link to={"/ver-reportes"}>Ver reportes</Link> */}
                            { usuario?.esSupervisor === 2 && <Link to={"/usuarios"}>Usuarios</Link> }
                            {/* <Link to={"/usuarios"}>Usuarios</Link> */}
                            {/* <form className='buscar-section' onSubmit={(e) => e.preventDefault()}>
                                <input className='form-control navbar-fetch-input' ref={input} autoComplete='off' placeholder='/img/el-pepe.jpg' defaultValue={'/img/el-pepe.jpg'} />
                                <Button onClick={fetchData} className='form-control navbar-fetch-button' variant='outline-secondary'>Fetch data</Button>
                                <Button onClick={verUsuario} className='form-control navbar-fetch-button' variant='outline-secondary'>Ver usuario</Button>
                            </form> */}
                        </Nav>
                        {
                            usuario ? 
                            <img className='logo user-foto img-user-nav' alt='foto-usuario' src={usuario.foto} onClick={() => setModalShow(true)} />
                            : /* cambiarle el fondo al boton de google */
                            <LogInButton />
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