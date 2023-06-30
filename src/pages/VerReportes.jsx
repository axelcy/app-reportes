import { useEffect, useState } from "react"
import NavBar from "../Components/NavBar"
import useFetch from "../Hooks/useFetch"
import Reporte from "../Components/Reporte"
import './VerReportes.css'
import { Button, Container } from "react-bootstrap"
import Dropdown from 'react-bootstrap/Dropdown'
import { FaFilter } from 'react-icons/fa'

const VerReportes = () => {
    const [listaReportes, setListaReportes] = useState([])
    const [reportesActivos, setReportesActivos] = useState([])
    const [ascOrder, setAscOrder] = useState(true)

    useEffect(() => async () => {
        const reportes = await useFetch('/incidentes/estado/1') // reportes a resolver
        setListaReportes(reportes)
        setReportesActivos(reportes)
    }, [])

    const handleOrder = () => {
        setReportesActivos([...reportesActivos].reverse())
        setAscOrder(!ascOrder)
    }
    const handleFilters = async (e) => {
        if (e.target.name === 'fecha') setReportesActivos([...listaReportes].sort((a, b) => a.fecha - b.fecha))
        else if (e.target.name === 'edificio') setReportesActivos([...listaReportes].sort((a, b) => a.nombre - b.nombre))
        else if (e.target.name === 'importancia') setReportesActivos([...listaReportes].sort((a, b) => a.importancia - b.importancia))
    }

    return (
        <>
            <NavBar />
            <Container>
                <div className="mis-reportes-container">
                    <h1>Reportes</h1>
                    <header className="">
                        <Dropdown>
                            <div className="divOrder">
                            <Dropdown.Toggle variant="info" className="toggle" id="dropdown-basic"><FaFilter /> Ordenar por</Dropdown.Toggle>
                            <Button variant="info" className="toggle" onClick={handleOrder}>Orden: {ascOrder ? 'Asc' : 'Desc'}</Button>
                            </div>
                            <Dropdown.Menu className="dropdown">
                                <Dropdown.Item name="fecha" onClick={handleFilters}>Fecha</Dropdown.Item>
                                <Dropdown.Item name="edificio" onClick={handleFilters}>Edificio</Dropdown.Item>
                                <Dropdown.Item name="importancia" onClick={handleFilters}>Importancia</Dropdown.Item>
                                <Dropdown.Item name="categoria" onClick={handleFilters}>informatica</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </header>
                    <label>Buscar</label>
                    <input type='text' className="styled-input" />
                    <div className="lista-reportes-container">
                        {
                            !reportesActivos.length ? <h3>Acá aparecerán tus reportes</h3> :
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