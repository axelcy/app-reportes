import { Container, Row, Button, ToggleButton, ToggleButtonGroup, Form } from "react-bootstrap"
import './Form.css'
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import useFetch from "../Hooks/useFetch"
import NavBar from "../Components/NavBar"


const FormReportes = () => {

    const [edificios, setEdificios] = useState([])
    const [pisos, setPisos] = useState([])
    const [aulas, setAulas] = useState([])
    const [ubicacion, setUbicacion] = useState({
        edificio: null,
        piso: null,
        aula: null
    })
    const [incidente, setIncidente] = useState({})

    const handleChange = (e) => {
        setIncidente({...incidente, [e.target.name]: e.target.value})
    }

    const updateUbicacion = async (e) => {
        setUbicacion({ ...ubicacion, [e.target.name]: (await useFetch(`/${e.target.name}/${Number(e.target.value)}`))[0] })
        if (e.target.name === 'edificio') {
            setPisos([])
            setAulas([])
            setPisos(await useFetch('/pisos/edificio/' + e.target.value))
        }
        if (e.target.name === 'piso') {
            setAulas([])
            setAulas(await useFetch('/aulas/piso/' + e.target.value))
        }
    }

    useEffect(() => async () => setEdificios(await useFetch('/edificios')), [])
    const handleSubmit = async() => {
        const data = {
            categoria: null,
            nivelImportancia: 1,
            ...incidente,
            idPisoAula: (await useFetch("/pisoaula/aula/" + ubicacion.aula.id))[0].id,
            fecha: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
            // el mes es 5 no se xq esta mal
            idUsuario: 0, // hay q hacer login para esto
            estado: 1, // en espera
            idUsuarioSolucion: null,
        }
        console.log(data)
        await useFetch('/post/incidente', data)
        setIncidente({})
    }
    return (
        <>
            <NavBar />
            <Link to={"/"}><h3>Ir a /</h3></Link>
            <Container>
                <h2>Formulario reporte</h2>
                <Form> {/* onSubmit={async() => await handleSubmit()} */}
                    <Row>
                        <Form.Group className="mb-3 animated-input" controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" autoComplete="off" required name="nombre" onChange={handleChange}/>
                            <Form.Label>Nombre</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3 animated-input" autoComplete="off" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={3} required name="descripcion" onChange={handleChange}/>
                            <Form.Label>Descripción</Form.Label>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Label>Nivel de importancia</Form.Label>
                        <ToggleButtonGroup type="radio" name="nivelImportancia">
                            <ToggleButton id="tbg-radio-1" onChange={handleChange} className="button-importancia" value={1} variant={'success'} > Bajo </ToggleButton>
                            <ToggleButton id="tbg-radio-2" onChange={handleChange} className="button-importancia" value={2} variant={'warning'} > Medio </ToggleButton>
                            <ToggleButton id="tbg-radio-3" onChange={handleChange} className="button-importancia" value={3} variant={'danger'} > Alto </ToggleButton>
                        </ToggleButtonGroup>
                    </Row>
                    <Row>
                        <Form.Label>Categoría</Form.Label>
                        <Form.Group>
                            <Form.Select onChange={handleChange} name="categoria">
                                <option value={null}>Seleccione una categoría</option>
                                <option value={1}>Electricidad</option>
                                <option value={2}>Informática</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="form-epa">
                        <div>
                            <Form.Label>Edificio</Form.Label>
                            <Form.Group>
                                <Form.Select className="ubicacion-field" onChange={async(e) => await updateUbicacion(e)} name="edificio">
                                    <option value={0}></option>
                                    {edificios?.map((edificio, key) =>
                                        <option key={key} value={edificio.id}>{edificio.descripcion}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Label>Piso</Form.Label>
                            <Form.Group>
                                <Form.Select className="ubicacion-field" onChange={async(e) => await updateUbicacion(e)} name="piso" disabled={!Boolean(pisos?.length)}>
                                    <option value={0}></option>
                                    {pisos?.map((piso, key) =>
                                        <option key={key} value={piso.id}>{piso.descripcion}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Label>Aula</Form.Label>
                            <Form.Group>
                                <Form.Select className="ubicacion-field" onChange={async(e) => await updateUbicacion(e)} name="aula" disabled={!Boolean(aulas?.length)}>
                                    <option value={0}></option>
                                    {aulas?.map((aula, key) =>
                                        <option key={key} value={aula.id} >{aula.descripcion}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </Row>
                    <Row>
                        <Form.Group>
                            <div>{ubicacion.aula ? JSON.stringify(ubicacion.aula) : "no existe"}</div>
                            <Button variant="primary" type="button" onClick={async() => await handleSubmit()} disabled={!ubicacion.aula || !incidente.nombre}>Reportar</Button>
                        </Form.Group>
                    </Row>
                </Form>
            </Container>
        </>
    )
}

export default FormReportes