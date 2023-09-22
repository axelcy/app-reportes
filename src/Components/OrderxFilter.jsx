import { useState, useEffect } from 'react'
import { Button, Row, Form, ToggleButtonGroup, ToggleButton } from "react-bootstrap"
import Dropdown from 'react-bootstrap/Dropdown'
import { FaFilter } from 'react-icons/fa'
import useFetch from "../Hooks/useFetch"
import './OrderxFilter.css'

function OrderxFilter({ listaReportes, setReportesActivos, reportesActivos }) {

    const [ascOrder, setAscOrder] = useState(false)
    const [inputType, setInputType] = useState("hidden")
    const [inputTypeFecha1, setInputFecha1] = useState("hidden")
    const [inputTypeFecha2, setInputFecha2] = useState("hidden")
    const [filterEdificios, setFilterEdificios] = useState("toggle d-none")
    const [filterImportancia, setFIlterImportancia] = useState("toggle d-none")
    const [filterType, setFilterType] = useState('todo')
    const [filter, setFilter] = useState("")
    const [filterUbicacion, setFilterUbicacion] = useState([])
    const [minDate, setMinDate] = useState('')
    const [maxDate, setMaxDate] = useState('')
    const [edificios, setEdificios] = useState([])
    const [pisos, setPisos] = useState([])
    const [aulas, setAulas] = useState([])


    useEffect(() => async () => {
        setEdificios(await useFetch('/edificios'))
    }, [])

    // const handleUbicacionChange = async (e) => {
    //     if (e.target.name === 'edificio-dropdown') {
    //         setPisos([])
    //         setAulas([])
    //         setPisos(await useFetch('/pisos/edificio/' + e.target.value))
    //     }
    //     if (e.target.name === 'piso-dropdown') {
    //         setAulas([])
    //         setAulas(await useFetch('/aulas/piso/' + e.target.value))
    //     }
    // }

    const handleUbicacionChange = async (e) => {
        if (e.target.name === 'edificios') {
            setPisos([])
            setAulas([])
            setPisos(await useFetch('/pisos/edificio/' + e.target.value))
        }
        if (e.target.name === 'pisos') {
            setAulas([])
            setAulas(await useFetch('/aulas/piso/' + e.target.value))
        }
    }

    const handleOrder = () => {
        setReportesActivos([...reportesActivos].reverse())
        setAscOrder(!ascOrder)
    }
    const handleOrder2 = async (e) => {
        let newReportesActivos = [...reportesActivos]
        document.getElementById("dropdown-basic").innerHTML = `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg> Ordenar por ${e.target.name}`
        if (!ascOrder) {
            if (e.target.name === "fecha") newReportesActivos.sort((a, b) => a.fecha - b.fecha)
            if (e.target.name === "edificio") newReportesActivos.sort((a, b) => a.idPisoAula - b.idPisoAula)
            if (e.target.name === "importancia") newReportesActivos.sort((a, b) => a.importancia - b.importancia)
            if (e.target.name === "categoria") newReportesActivos.sort((a, b) => a.idCategoria - b.idCategoria)
            console.log(reportesActivos)
        }
        if (!ascOrder) newReportesActivos.reverse()
        setReportesActivos(newReportesActivos)

    }
    const handleChange = (e) => {
        if (e.target.name !== "inputFiltros") return
        let arrayElementos = Array.from(document.getElementsByClassName("form-button-active"))
        if (arrayElementos.length > 0) {
            for (let i = 0; i < arrayElementos.length; i++) {
                document.getElementsByClassName("form-button-active")[i].classList.remove('form-button-active')
            }
        }
        e.target.classList.add('form-button-active')
    }
    const handleFilters = async (e) => {
        handleChange(e)
        handleUbicacionChange(e)
        if (e.target.name === 'edificios'){
            setFilter(e.target.value)
            edificios.forEach(element => {
                if(element.id.toString() === e.target.value) setFilterUbicacion(element)
            })
        }
        else if(e.target.name === 'pisos'){
            setFilter(e.target.value)
            pisos.forEach(element => {
                if(element.id.toString() === e.target.value) setFilterUbicacion(element)
            })
        }
        else if(e.target.name === 'aulas'){
            setFilter(e.target.value)
            aulas.forEach(element => {
                if(element.id.toString() === e.target.value) setFilterUbicacion(element)
            })
            console.log(filterUbicacion)
        }
        if (e.target.name === 'inputFiltros') {
            setFilter(e.target.value)
            console.log(e.target.value)
        }
        else if (e.target.name === 'inputFiltrosMin') {
            setMinDate(e.target.value);
        }
        else if (e.target.name === 'inputFiltrosMax') {
            setMaxDate(e.target.value);
        }
        else {
            if (e.target.name === 'todo') {
                setReportesActivos(listaReportes)
                setInputType('hidden')
                setInputFecha1('hidden')
                setInputFecha2('hidden')
                setFilterEdificios("toggle d-none")
                setFIlterImportancia("toggle d-none")
            }
            if (e.target.name === 'edificio') {
                setReportesActivos(listaReportes)
                setFilterType('edificio')
                setInputType('hidden')
                setInputFecha1('hidden')
                setInputFecha2('hidden')
                setFilterEdificios("toggle")
                setFIlterImportancia("toggle d-none")
            }
            if (e.target.name === 'fecha') {
                setReportesActivos(listaReportes)
                setFilterType('fecha')
                setInputType('hidden')
                setInputFecha1('date')
                setInputFecha2('date')
                setFilterEdificios("toggle d-none")
                setFIlterImportancia("toggle d-none")

            }
            if (e.target.name === 'importancia') {
                setReportesActivos(listaReportes)
                setFilterType('importancia')
                setInputType('hidden')
                setInputFecha1('hidden')
                setInputFecha2('hidden')
                setFilterEdificios("toggle d-none")
                setFIlterImportancia("toggle")

            }
            if (e.target.name === 'categoria') {
                setReportesActivos(listaReportes)
                setFilterType('categoria')
                setInputType('number')
                setInputFecha1('hidden')
                setInputFecha2('hidden')
                setFilterEdificios("toggle d-none")
                setFIlterImportancia("toggle d-none")

            }
        }
    }

    useEffect(() => {
        if (filter === "") setReportesActivos(listaReportes)
        if (filterType === 'edificio') setReportesActivos(listaReportes.filter(({ idPisoAula }) => idPisoAula == filter))
        if (filterType === 'fecha') {
            if (minDate && maxDate) setReportesActivos(listaReportes.filter(({ fecha }) => fecha.slice(0, 10) >= minDate && fecha.slice(0, 10) <= maxDate))
            else if (minDate) setReportesActivos(listaReportes.filter(({ fecha }) => fecha.slice(0, 10) >= minDate))
            else if (maxDate) setReportesActivos(listaReportes.filter(({ fecha }) => fecha.slice(0, 10) <= maxDate))
        }
        if (filterType === 'importancia') setReportesActivos(listaReportes.filter(({ importancia }) => importancia == filter))
        if (filterType === 'categoria') setReportesActivos(listaReportes.filter(({ categoria }) => categoria == filter))
        console.log(minDate, maxDate)
    }, [filter, minDate, maxDate])

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
                    <input name="inputFiltros" onChange={handleFilters} type={inputType} />
                    <Row className={`${filterImportancia} row-filtros`} >
                        <ToggleButtonGroup type="radio" name="inputFiltros" className="importancia-group"> {/* value={incidente.importancia} */}
                            <ToggleButton id="tbg-check-1" onChange={handleFilters} value={1}>Bajo </ToggleButton>
                            <ToggleButton id="tbg-check-2" onChange={handleFilters} value={2}>Medio</ToggleButton>
                            <ToggleButton id="tbg-check-3" onChange={handleFilters} value={3}>Alto</ToggleButton>
                        </ToggleButtonGroup>
                    </Row>
                    <input
                        name="inputFiltrosMin"
                        onChange={(e) => {
                            if (filterType === 'fecha') {
                                setMinDate(e.target.value);
                            }
                            handleFilters(e);
                        }}
                        type={inputTypeFecha1}
                        value={minDate}
                    />
                    <input
                        name="inputFiltrosMax"
                        onChange={(e) => {
                            if (filterType === 'fecha') {
                                setMaxDate(e.target.value);
                            }
                            handleFilters(e);
                        }}
                        type={inputTypeFecha2}
                        value={maxDate}
                    />
                    {/* <Dropdown>
                        <div className="divOrder">
                            <Dropdown.Toggle variant="info" className={FilterEdificios} id="dropdown-basic">Edificio</Dropdown.Toggle>
                        </div>
                        <Dropdown.Menu className="dropdown">
                            {
                                edificios?.map((edificios) =>
                                    <Dropdown.Item name='edificio-dropdown' className="option-form-reporte" onClick={async (e) => await handleUbicacionChange(e)} key={edificios.id} value={edificios.id}>{edificios.descripcion}</Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <div className="divOrder">
                            <Dropdown.Toggle variant="info" className={FilterEdificios} id="dropdown-basic">Piso</Dropdown.Toggle>
                        </div>
                        <Dropdown.Menu className="dropdown">
                            {
                                pisos?.map((pisos) =>
                                    <Dropdown.Item name='piso-dropdown' className="option-form-reporte" onClick={async (e) => await handleUbicacionChange(e)} key={pisos.id} value={pisos.id}>{pisos.descripcion}</Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <div className="divOrder">
                            <Dropdown.Toggle variant="info" className={FilterEdificios} id="dropdown-basic">Aula</Dropdown.Toggle>
                        </div>
                        <Dropdown.Menu className="dropdown">
                            {
                                aulas?.map((aulas) =>
                                    <Dropdown.Item name='aula-dropdown' className="option-form-reporte" onClick={async (e) => await handleUbicacionChange(e)} key={aulas.id} value={aulas.id}>{aulas.descripcion}</Dropdown.Item>
                                )
                            }
                        </Dropdown.Menu>
                        <Form.Group>
                                <Form.Select required className="ubicacion-field" onChange={async (e) => await handleUbicacionChange(e)} name="aula-dropdown" disabled={!Boolean(aulas?.length)}>
                                    <option>~ Aula ~</option>
                                    {aulas?.map((aula) =>
                                        <option key={aula.id} value={aula.id} >{aula.descripcion}</option>
                                    )}
                                </Form.Select>
                        </Form.Group>
                        
                    </Dropdown> */}


                    <Row className={`form-epa row-filtros ${filterEdificios}`} >
                        <div>
                            <Form.Group>
                                <Form.Select required className="ubicacion-field" onChange={handleFilters} name="edificios">
                                <option className="option-form-reporte">~ Edificio ~</option>
                                    {
                                        edificios?.map((edificio) =>
                                            <option className="option-form-reporte" key={edificio.id} value={edificio.id}>{edificio.descripcion}</option>
                                        )
                                    }
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Group>
                                <Form.Select required className="ubicacion-field" onChange={handleFilters} name="pisos" disabled={!Boolean(pisos?.length)}>
                                    <option>~ Piso ~</option>
                                    {pisos?.map((piso) =>
                                        <option key={piso.id} value={piso.id}>{piso.descripcion}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Group>
                                <Form.Select required className="ubicacion-field" onChange={async (e) => handleFilters} name="aulas" disabled={!Boolean(aulas?.length)}>
                                    <option>~ Aula ~</option>
                                    {aulas?.map((aula) =>
                                        <option key={aula.id} value={aula.id} >{aula.descripcion}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </Row>
                </div>
                <Dropdown.Menu className="dropdown">
                    <Dropdown.Item className="Dropdown-item" name="todo" onClick={handleFilters}>Todo</Dropdown.Item>
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