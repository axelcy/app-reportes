import { Container, Row, Button, ToggleButton, ToggleButtonGroup, Form } from "react-bootstrap"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import useFetch from "../Hooks/useFetch"
import NavBar from "../Components/NavBar"
import './Form.css'


const FormReportes = () => {
    const [categorias, setCategorias] = useState([])
    const [edificios, setEdificios] = useState([])

    const [pisos, setPisos] = useState([])
    const [aulas, setAulas] = useState([])
    const [ubicacion, setUbicacion] = useState({
        edificio: null,
        piso: null,
        aula: null
    })
    const [incidente, setIncidente] = useState({})

    const updateUbicacion = async (e) => {
        setUbicacion({ ...ubicacion, [e.target.name]: (await useFetch(`/${e.target.name}/${Number(e.target.value)}`)) })
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
    // ----------------------------------------------
    useEffect(() => async () => {
        setEdificios(await useFetch('/edificios'))
        setCategorias(await useFetch('/categorias'))
    }, [])

    const handleChange = (e) => {
        setIncidente({...incidente, [e.target.name]: e.target.value})
        if (e.target.name === "importancia") {
            let activos = document.getElementsByClassName("form-button-active")
            var arrayElementos = Array.from(activos)
            console.log(arrayElementos.length)
            if (arrayElementos.length > 0) {
                for (let i = 0; i < arrayElementos.length; i++) {
                    document.getElementsByClassName("form-button-active")[i].classList.remove('form-button-active')
                }
            }
            e.target.classList.add('form-button-active')
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const data = {
            importancia: 1,
            ...incidente,
            idPisoAula: (await useFetch("/pisoaula/aula/" + ubicacion.aula.id)).id,
            fecha: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
            idUsuario: 1, // hay q hacer login para esto
            estado: 1, // en espera
            idUsuarioSolucion: null,
        }
        await useFetch('/incidente', data)
        location.reload()
    }

    return (
        <>
            <NavBar />
            {/* <Link to={"/"}><h3>Ir a /</h3></Link> */}
            <Container>
                <h2 className="text">Formulario reporte</h2>
                <Form onSubmit={async (e) => await handleSubmit(e)}> {/* onSubmit={async() => await handleSubmit()} */}
                    <Row>
                        <Form.Group className="mb-3 animated-input" controlId="exampleForm.ControlInput1">
                            <Form.Control type="text" autoComplete="off" required name="nombre" onChange={handleChange} /> {/* value={incidente.nombre} */}
                            <Form.Label>Nombre</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3 animated-input" autoComplete="off" controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows={3} required name="descripcion" onChange={handleChange} /> {/* value={incidente.descripcion} */}
                            <Form.Label>Descripción</Form.Label>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Label className="label-form-reporte">Nivel de importancia</Form.Label>
                        <ToggleButtonGroup type="radio" name="importancia" className="importancia-group"> {/* value={incidente.importancia} */}
                            <ToggleButton id="tbg-check-1" onChange={handleChange} value={1}>Bajo </ToggleButton>
                            <ToggleButton id="tbg-check-2" onChange={handleChange} value={2}>Medio</ToggleButton>
                            <ToggleButton id="tbg-check-3" onChange={handleChange} value={3}>Alto</ToggleButton>
                        </ToggleButtonGroup>
                    </Row>
                    <Row>
                        <Form.Label className="label-form-reporte">Categoría</Form.Label>
                        <Form.Group>
                            <Form.Select required onChange={handleChange} name="categoria"> {/* value={incidente.categoria} */}
                                <option className="option-form-reporte" value={null}>Eliga una categoría</option>
                                {
                                    categorias?.map((categoria) => 
                                        <option className="option-form-reporte" key={categoria.id} value={categoria.id}>{categoria.descripcion}</option>
                                    )
                                }
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="form-epa">
                        <div>
                            <Form.Label className="label-form-reporte">Edificio</Form.Label>
                            <Form.Group>
                                <Form.Select required className="ubicacion-field" onChange={async(e) => await updateUbicacion(e)} name="edificio">
                                <option className="option-form-reporte" value={null}>~ Edificio ~</option>
                                    {
                                        edificios?.map((edificio) =>
                                            <option className="option-form-reporte" key={edificio.id} value={edificio.id}>{edificio.descripcion}</option>
                                        )
                                    }
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Label className="label-form-reporte">Piso</Form.Label>
                            <Form.Group>
                                <Form.Select required className="ubicacion-field" onChange={async (e) => await updateUbicacion(e)} name="piso" disabled={!Boolean(pisos?.length)}>
                                    <option value={null}>~ Piso ~</option>
                                    {pisos?.map((piso) =>
                                        <option key={piso.id} value={piso.id}>{piso.descripcion}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Label required className="label-form-reporte">Aula</Form.Label>
                            <Form.Group>
                                <Form.Select className="ubicacion-field" onChange={async (e) => await updateUbicacion(e)} name="aula" disabled={!Boolean(aulas?.length)}>
                                    <option value={null}>~ Aula ~</option>
                                    {aulas?.map((aula) =>
                                        <option key={aula.id} value={aula.id} >{aula.descripcion}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </Row>
                    <Row>
                        <Form.Group>
                            <Button variant="primary" type="submit" disabled={!ubicacion.aula}>Reportar</Button>
                        </Form.Group>
                    </Row>
                </Form>
            </Container>
        </>
    )
}

export default FormReportes