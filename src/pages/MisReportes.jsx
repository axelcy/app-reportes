import { useEffect, useState } from "react"
import NavBar from "../Components/NavBar"
import useUsuario from "../Hooks/useUsuario"
import useFetch from "../Hooks/useFetch"
import Reporte from "../Components/Reporte"
import './MisReportes.css'
import { Container, Button } from "react-bootstrap"
import Dropdown from 'react-bootstrap/Dropdown'
import { FaFilter } from 'react-icons/fa'

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

    const handleOrder = () => {
        setReportesActivos([...reportesActivos].reverse())
        setAscOrder(!ascOrder)
    }
    const handleFilters = async (e) => {

        if (ascOrder) {
            if (e.target.name === "fecha") setReportesActivos([...reportes].sort((a, b) => a.fecha - b.fecha))
            else if (e.target.name === "edificio") setReportesActivos([...reportes].sort((a, b) => a.idPisoAula - b.idPisoAula))
            else if (e.target.name === "importancia") setReportesActivos([...reportes].sort((a, b) => a.importancia - b.importancia))
            else if (e.target.name === "categoria") setReportesActivos([...reportes].sort((a, b) => a.idCategoria - b.idCategoria))
        }
        else {
            if (e.target.name === "fecha") setReportesActivos([...reportes].sort((a, b) => b.fecha - a.fecha))
            else if (e.target.name === "edificio") setReportesActivos([...reportes].sort((a, b) => b.idPisoAula - a.idPisoAula))
            else if (e.target.name === "importancia") setReportesActivos([...reportes].sort((a, b) => b.importancia - a.importancia))
            else if (e.target.name === "categoria") setReportesActivos([...reportes].sort((a, b) => b.idCategoria - a.idCategoria))
        }

    }

    if (!usuario && !import.meta.env.VITE_BYPASS) return (
        <>
            <NavBar />
            <h1>Acceso denegado</h1>
            <h4>Es necesario estar logeado para poder ver tus reportes</h4>
        </>
    )
    return (
        <>
            <NavBar />
            <Container>
                <div className="mis-reportes-container">
                    <h1>Mis Reportes</h1>
                <Dropdown>
                    <div className="divOrder">
                        <Dropdown.Toggle variant="info" className="toggle" id="dropdown-basic"><FaFilter /> Ordenar por</Dropdown.Toggle>
                        <Button variant="info" className="toggle" onClick={handleOrder}>Orden: {ascOrder ? 'Asc' : 'Desc'}</Button>
                    </div>
                    <Dropdown.Menu className="dropdown">
                        <Dropdown.Item name="fecha" onClick={handleFilters}>Fecha</Dropdown.Item>
                        <Dropdown.Item name="edificio" onClick={handleFilters}>Edificio</Dropdown.Item>
                        <Dropdown.Item name="importancia" onClick={handleFilters}>Importancia</Dropdown.Item>
                        <Dropdown.Item name="categoria" onClick={handleFilters}>Categoria</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
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