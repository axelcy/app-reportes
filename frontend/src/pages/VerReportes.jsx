import { useEffect, useState } from "react"
import NavBar from "../Components/NavBar"
import useFetch from "../Hooks/useFetch"
import Reporte from "../Components/Reporte"
import './VerReportes.css'
import { Button, Container } from "react-bootstrap"
import useUsuario from "../Hooks/useUsuario"
import ReporteModal from "../Components/ReporteModal"
import OrderxFilter from "../Components/OrderxFilter"

const VerReportes = () => {
    const { usuario } = useUsuario()
    if (usuario === null || usuario.esSupervisor === 0) return (
        <>
            <NavBar />
            <h1>Acceso denegado</h1>
            <h4>Es necesario ser supervisor ver los reportes a resolver.</h4>
        </>
    )

    const [estadoReportes, setEstadoReportes] = useState(1)

    const [listaReportes, setListaReportes] = useState([])
    const [reportesActivos, setReportesActivos] = useState([])

    useEffect(() => async () => {
        const reportes = await useFetch('/incidentes/estado/' + estadoReportes) // reportes a resolver
        setListaReportes(reportes)
        setReportesActivos(reportes)
        var element = document.getElementsByName("inputFiltros")
        element.visibility = 'hidden'
    }, [estadoReportes])

    const handleSwitchType = () => {
        console.log(estadoReportes)
        if (estadoReportes === 1) return setEstadoReportes(2)
        else return setEstadoReportes(1)
    }
    // !import.meta.env.VITE_BYPASS
    
    return (
        <>
            <NavBar />
            <Container>
                <div className="mis-reportes-container">
                    <h1>Reportes a resolver</h1>
                    <header className="">
                        <OrderxFilter listaReportes={listaReportes} setReportesActivos={setReportesActivos} reportesActivos={reportesActivos} />
                    </header>
                    <label>Buscar</label>
                    <input type='text' className="styled-input" />
                    <div>
                    <Button onClick={handleSwitchType}>Switch tipo reporte</Button>
                    </div>
                    <div className="lista-reportes-container">
                        {
                            !reportesActivos.length ? <h3>Acá aparecerán los reportes a resolver</h3> :
                            reportesActivos.map(reporte => (
                                <Reporte key={reporte.id} reporte={reporte} />
                            ))
                        }
                    </div>
                </div>
            </Container>
        </>
    )
}

export default VerReportes