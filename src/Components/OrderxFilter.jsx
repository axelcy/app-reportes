import { useState, useEffect } from 'react'
import { Button } from "react-bootstrap"
import Dropdown from 'react-bootstrap/Dropdown'
import { FaFilter } from 'react-icons/fa'
import './OrderxFilter.css'

function OrderxFilter({listaReportes, setReportesActivos, reportesActivos}) {

    const [ascOrder, setAscOrder] = useState(false)
    const [filter, setFilter] = useState("")

    const handleOrder = () => {
        setReportesActivos([...reportesActivos].reverse())
        setAscOrder(!ascOrder)
    }
    const handleOrder2 = async (e) => {
        document.getElementById("dropdown-basic").innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg> Ordenar por ${e.target.name}`
        if (!ascOrder) {
            if (e.target.name === "fecha") setReportesActivos([...listaReportes].sort((a, b) => a.fecha - b.fecha))
            if (e.target.name === "edificio") setReportesActivos([...listaReportes].sort((a, b) => a.idPisoAula - b.idPisoAula))
            if (e.target.name === "importancia") setReportesActivos([...listaReportes].sort((a, b) => a.importancia - b.importancia))
            if (e.target.name === "categoria") setReportesActivos([...listaReportes].sort((a, b) => a.idCategoria - b.idCategoria))
            console.log(reportesActivos)
        }
        else {
            if (e.target.name === "fecha") setReportesActivos([...listaReportes].sort((a, b) => b.fecha - a.fecha))
            if (e.target.name === "edificio") setReportesActivos([...listaReportes].sort((a, b) => b.idPisoAula - a.idPisoAula))
            if (e.target.name === "importancia") setReportesActivos([...listaReportes].sort((a, b) => b.importancia - a.importancia))
            if (e.target.name === "categoria") setReportesActivos([...listaReportes].sort((a, b) => b.idCategoria - a.idCategoria))
        }

    }
    const handleFilters = (e) => {
        if (e.target.name === 'inputFiltros') setFilter(e.target.value)
        else {
            document.getElementById("dropdown-basic2").innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg> Ordenar por ${e.target.name}`
            if (e.target.name === 'todo') setReportesActivos(listaReportes)
            if (e.target.name === 'edificio') setReportesActivos(listaReportes.filter(({ idPisoAula }) => idPisoAula === e.target.input.value))
            if (e.target.name === 'fecha') setReportesActivos(listaReportes.filter(({ fecha }) => fecha === e.target.input.value))
            if (e.target.name === 'importancia') //setReportesActivos(listaReportes.filter(({importancia}) => importancia == filter))
                if (e.target.name === 'categoria') setReportesActivos(listaReportes.filter(({ categoria }) => categoria === 1))
        }
        console.log(filter)
    }

    useEffect(() => {
        if (filter === "") setReportesActivos(listaReportes)
        else setReportesActivos(listaReportes.filter(({ importancia }) => importancia == filter))
    }, [filter])

    return (
        <>
            <Dropdown>
                <div className="divOrder">
                    <Dropdown.Toggle variant="info" className="toggle" id="dropdown-basic"><FaFilter /> Ordenar por fecha</Dropdown.Toggle>
                    <Button variant="info" className="toggle" onClick={handleOrder}>{ascOrder ? 'Asc' : 'Desc'}</Button>
                </div>
                <Dropdown.Menu className="dropdown">
                    <Dropdown.Item className="Dropdown-item" name="fecha" onClick={handleOrder2}>Fecha</Dropdown.Item>
                    <Dropdown.Item className="Dropdown-item" name="edificio" onClick={handleOrder2}>Edificio</Dropdown.Item>
                    <Dropdown.Item className="Dropdown-item" name="importancia" onClick={handleOrder2}>Importancia</Dropdown.Item>
                    <Dropdown.Item className="Dropdown-item" name="categoria" onClick={handleOrder2}>Categoria</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown>
                <div className="divOrder">
                    <Dropdown.Toggle variant="info" className="toggle" id="dropdown-basic2"><FaFilter /> Filtrar por </Dropdown.Toggle>
                    <input name="inputFiltros" onChange={handleFilters} type="number" />
                </div>
                <Dropdown.Menu className="dropdown">
                    <Dropdown.Item className="Dropdown-item" name="fecha" onClick={handleFilters}>Fecha</Dropdown.Item>
                    <Dropdown.Item className="Dropdown-item" name="edificio" onClick={handleFilters}>Edificio</Dropdown.Item>
                    <Dropdown.Item className="Dropdown-item" name="importancia" onClick={handleFilters}>Importancia</Dropdown.Item>
                    <Dropdown.Item className="Dropdown-item" name="categoria" onClick={handleFilters}>Categoria</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    )
}

export default OrderxFilter;