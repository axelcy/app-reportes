import { useEffect, useState } from "react"
import NavBar from "../Components/NavBar"
import useFetch from "../Hooks/useFetch"
import Reporte from "../Components/Reporte"
import './VerReportes.css'
import { Container } from "react-bootstrap"
import Dropdown from 'react-bootstrap/Dropdown'
import { FaFilter } from 'react-icons/fa'

const VerReportes = () => {
    const [listaReportes, setListaReportes] = useState([])
    const [reportesActivos, setReportesActivos] = useState([])

    useEffect(() => async () => {
        const reportes = await useFetch('/incidentes/estado/1') // reportes a resolver
        setListaReportes(reportes)
        setReportesActivos(reportes)
    }, [])

    const handleFilters = async (e) => {
        if (e.target.name === 'todo') setReportesActivos(listaReportes)
        if (e.target.name === 'importancia') setReportesActivos(listaReportes.filter(({importancia}) => importancia === 3))
        if (e.target.name === 'categoria') setReportesActivos(listaReportes.filter(({categoria}) => categoria === 1))
    }
    return (
        <>
            <NavBar />
            <Container>
                <div className="mis-reportes-container">
                    <h1>Reportes</h1>
                    <Dropdown>
                        <Dropdown.Toggle variant="info" className="toggle" id="dropdown-basic"><FaFilter /> Filtros</Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown">
                            <Dropdown.Item name="todo" onClick={handleFilters}>Todos</Dropdown.Item>
                            <Dropdown.Item name="importancia" onClick={handleFilters}>Importancia alta</Dropdown.Item>
                            <Dropdown.Item name="categoria" onClick={handleFilters}>informatica</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <label>Buscar</label>
                    <input type='text' className="styled-input"/>
                    <div className="lista-reportes-container">
                        {
                            !reportesActivos.length ? <h3>Acá aparecerán tus reportes</h3> :
                            reportesActivos.map((reporte, index) => (
                                <Reporte key={index} reporte={reporte} />
                            ))
                        }
                    </div>
                </div>
            </Container>
        </>
    )
}

export default VerReportes