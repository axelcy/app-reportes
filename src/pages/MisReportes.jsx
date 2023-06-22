import { useEffect, useState } from "react"
import NavBar from "../Components/NavBar"
import useUsuario from "../Hooks/useUsuario"
import useFetch from "../Hooks/useFetch"
import ReporteCard from "../Components/ReporteCard"
import './MisReportes.css'

const MisReportes = () => {
    const { usuario } = useUsuario()
    const [reportes, setReportes] = useState([])
    // no se cambian los reportes cuando se cambia de usuario, hace falta recargar la pag
    useEffect(() => async () => {
        try {
            setReportes(await useFetch('/incidentes/' + usuario.id))
        } catch {
            setReportes([])
        }
    }, [usuario])

    if (!usuario) return (
        <>
            <NavBar />
            <h1>Acceso denegado</h1>
            <h4>Es necesario estar logeado para poder ver tus reportes</h4>
        </>
    )
    return (
        <>
            <NavBar />
            <div className="mis-reportes-container">
                <h1>Mis Reportes</h1>
                <div className="lista-reportes-container">
                    {
                        !reportes.length ? <h3>Acá aparecerán tus reportes</h3> :
                        reportes.map((reporte, index) => (
                            <ReporteCard key={index} reporte={reporte} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default MisReportes