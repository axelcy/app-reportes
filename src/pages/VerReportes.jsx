import { useEffect, useState } from "react"
import NavBar from "../Components/NavBar"
import useFetch from "../Hooks/useFetch"
import Reporte from "../Components/Reporte"
import './VerReportes.css'
import { Button, Container, Form, ToggleButtonGroup, ToggleButton, Row } from "react-bootstrap"
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

    const [busqueda, setBusqueda] = useState('')

    const handleChange = e => setBusqueda(e.target.value)

    useEffect(() => async() => {
        await start(1)
    }, [])

    const start = async(estado) => {
        const reportes = await useFetch('/incidentes/estado/' + estado) // reportes a resolver
        // console.log(estado)
        // console.log(await useFetch('/incidentes/estado/' + estado))
        setListaReportes(reportes)
        setReportesActivos(reportes)
        var element = document.getElementsByName("inputFiltros")
        element.visibility = 'hidden'
    }
    useEffect(() => setReportesActivos(listaReportes.filter(e => new RegExp(busqueda, 'gi').test(e.nombre))), [busqueda]) // letal flitrar

    const handleSwitchType = async(e) => {
        // console.log(estadoReportes)
        // console.log(Number(e.target.value))
        setEstadoReportes(Number(e.target.value))
        await start(Number(e.target.value))
        // if (estadoReportes === 1) return setEstadoReportes(2)
        // else return setEstadoReportes(1)
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
                    <input type='text' className="styled-input" onChange={handleChange} />
                    <div className="switch-tipo-reporte-container">
                    {/* <Button onClick={handleSwitchType}>Switch Solucionados</Button> */}
                    <Row>
                        <Form.Label className="label-form-reporte" id="label-tipo-reporte">Tipo de reporte</Form.Label>
                            <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                                <Button id="tbg-check-1" onClick={handleSwitchType} value={1}>A resolver </Button>
                                <Button id="tbg-check-2" onClick={handleSwitchType} value={2}>Solucionados</Button>
                                <Button id="tbg-check-3" onClick={handleSwitchType} value={3}>Cerrados</Button>
                            </div>
                    </Row>
                    {/* <span>{estadoReportes === 1 ? 'A resolver' : 'Solucionados'}</span> */}
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