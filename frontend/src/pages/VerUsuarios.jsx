import { useEffect, useState } from "react"
import NavBar from "../Components/NavBar"
import useFetch from "../Hooks/useFetch"
import Reporte from "../Components/Reporte"
import './VerReportes.css'
import { Button, Container } from "react-bootstrap"
import useUsuario from "../Hooks/useUsuario"
import ReporteModal from "../Components/ReporteModal"
import OrderxFilter from "../Components/OrderxFilter"
import Usuario from "../Components/Usuario"

const VerUsuarios = () => {
    const { usuario } = useUsuario()
    if (usuario === null || !usuario.esSupervisor) return (
        <>
            <NavBar />
            <h1>Acceso denegado</h1>
            <h4>Es necesario ser supervisor (ADMIN) ver los reportes a resolver.</h4>
        </>
    )

    const [listaUsuarios, setListaUsuarios] = useState([])
    const [usuariosActivos, setUsuariosActivos] = useState([])

    useEffect(() => async () => {
        const usuarios = await useFetch('/usuarios')
        setListaUsuarios(usuarios)
        setUsuariosActivos(usuarios)
    }, [])
    
    return (
        <>
            <NavBar />
            <Container>
                <div className="mis-reportes-container">
                    <h1>Usuarios</h1>
                    <header className="">
                    </header>
                    <label>Buscar</label>
                    <input type='text' className="styled-input" />
                    <div>
                    </div>
                    <div className="lista-reportes-container">
                        {
                            !usuariosActivos.length ? <h3>Acá aparecerán los usuarios a administrar</h3> :
                            usuariosActivos.map(usuario => (
                                <Usuario key={usuario.id} usuario={usuario} />
                            ))
                        }
                    </div>
                </div>
            </Container>
        </>
    )
}

export default VerUsuarios