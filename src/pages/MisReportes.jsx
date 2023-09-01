import { useEffect, useState } from "react"
import NavBar from "../Components/NavBar"
import useUsuario from "../Hooks/useUsuario"
import useFetch from "../Hooks/useFetch"
import Reporte from "../Components/Reporte"
import './MisReportes.css'
import { Container, Button } from "react-bootstrap"
import OrderxFilter from "../Components/OrderxFilter"

const MisReportes = () => {
    const { usuario } = useUsuario()
    const [reportes, setReportes] = useState([])
    const [reportesActivos, setReportesActivos] = useState([])
    const [ascOrder, setAscOrder] = useState(true)
    // no se cambian los reportes cuando se cambia de usuario, hace falta recargar la pag
    useEffect(() => async () => {
        try {
            const reportes = await useFetch('/incidentes/' + usuario.id)
            setReportes(reportes)
            setReportesActivos(reportes)    
        } catch {
            setReportes([])
        }
    }, [usuario])


    if (!usuario && !import.meta.env.VITE_BYPASS) return (
        <>
            <NavBar />
            <h1>Acceso denegado</h1>
            <h4>Es necesario estar logeado para poder ver tus reportes.</h4>
        </>
    )
    return (
        <>
            <NavBar />
            <Container>
                <div className="mis-reportes-container">
                    <h1>Mis Reportes</h1>
                    <OrderxFilter listaReportes={reportes} setReportesActivos={setReportesActivos} reportesActivos={reportesActivos} />
                    <div className="lista-reportes-container">
                        {
                            !reportesActivos.length ? <h3>Acá aparecerán tus reportes</h3> :
                            reportesActivos.map((reporte) => (
                                    <Reporte key={reporte.id} reporte={reporte} />
                                ))
                        }
                    </div>
                </div>
            </Container>
        </>
    )
}

export default MisReportes