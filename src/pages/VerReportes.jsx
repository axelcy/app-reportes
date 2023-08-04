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

    const [listaReportes, setListaReportes] = useState([])
    const [reportesActivos, setReportesActivos] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [reporteModal, setReporteModal] = useState(null)

    useEffect(() => async () => {
        const reportes = await useFetch('/incidentes/estado/1') // reportes a resolver
        setListaReportes(reportes)
        setReportesActivos(reportes)
        var element = document.getElementsByName("inputFiltros")
        element.visibility = 'hidden'
        
    }, [])

    const handleOpenModal = reporte => {
        console.log('handleOpenModal()')
        setReporteModal(reporte)
        setModalShow(show => !show)
        // return true
    }

    if (!usuario && !import.meta.env.VITE_BYPASS) return (
        <>
            <NavBar />
            <h1>Acceso denegado</h1>
            <h4>Es necesario estar logeado para poder ver los reportes a resolver</h4>
        </>
    )
    return (
        <>
            <NavBar />
            <ReporteModal show={modalShow} setShow={setModalShow} reporte={reporteModal} />
            <Container>
                <div className="mis-reportes-container">
                    <h1>Reportes</h1>
                    <header className="">
                        <OrderxFilter listaReportes={listaReportes} setReportesActivos={setReportesActivos} reportesActivos={reportesActivos} />
                    </header>
                    <label>Buscar</label>
                    <input type='text' className="styled-input" />
                    <div className="lista-reportes-container">
                        {
                            !reportesActivos.length ? <h3>Acá aparecerán los reportes a resolver</h3> :
                            reportesActivos.map(reporte => (
                                <Reporte key={reporte.id} reporte={reporte} openModal={handleOpenModal} />
                            ))
                        }
                    </div>
                </div>
            </Container>
        </>
    )
}

export default VerReportes