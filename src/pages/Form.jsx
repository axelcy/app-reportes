import { Container, Row, Button, ToggleButton, ToggleButtonGroup, Form } from "react-bootstrap"
import { useEffect, useState, useCallback, useRef } from "react"
import { Link } from 'react-router-dom'
import useFetch from "../Hooks/useFetch"
import NavBar from "../Components/NavBar"
import './Form.css'
import useUsuario from "../Hooks/useUsuario"
import Webcam from "react-webcam"

const FormReportes = () => {
    const { usuario } = useUsuario()
    // estados que solo cambian en el montaje
    const [categorias, setCategorias] = useState([])
    const [edificios, setEdificios] = useState([])
    // ---------------------
    const [pisos, setPisos] = useState([])
    const [aulas, setAulas] = useState([])
    const [ubicacion, setUbicacion] = useState({ edificios: null, pisos: null, aulas: null })
    const [incidente, setIncidente] = useState({})

    const webcamRef = useRef()
    const [shoWwebcam, setShowWebcam] = useState(false)
    const [image, setImage] = useState(null)
    const [showImage, setShowImage] = useState(false)

    useEffect(() => async () => {
        setEdificios(await useFetch('/edificios'))
        setCategorias(await useFetch('/categorias'))
    }, [])

    const handleChange = (e) => {
        setIncidente({...incidente, [e.target.name]: e.target.value})
        if (e.target.name !== "importancia") return
        let arrayElementos = Array.from(document.getElementsByClassName("form-button-active"))
        if (arrayElementos.length > 0) {
            for (let i = 0; i < arrayElementos.length; i++) {
                document.getElementsByClassName("form-button-active")[i].classList.remove('form-button-active')
            }
        }
        e.target.classList.add('form-button-active')
    }
    const handleUbicacionChange = async (e) => {
        setUbicacion({ ...ubicacion, [e.target.name]: (await useFetch(`/${e.target.name}/${Number(e.target.value)}`)) })
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
    const handleSubmit = async(e) => {
        e.preventDefault()
        const data = {
            ...incidente,
            foto: image,
            idPisoAula: (await useFetch("/pisosaulas/aula/" + ubicacion.aulas.id)).id,
            fecha: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`, // falta la hora
            idUsuario: usuario.id,
            estado: 1, // en espera
            idUsuarioSolucion: null,
        }
        await useFetch('/incidentes', data)
        location.reload()
    }
    const handleSubmitFoto = () => {
        setShowWebcam(false)
        const imageSrc = webcamRef.current.getScreenshot()
        // console.log(imageSrc.length)
        setImage(imageSrc)
    }
    const handleShowImage = mostrar => setShowImage(mostrar)

    return (
        <>
            <NavBar />
            <Container>
                <h2 className="text">Formulario reporte</h2>
                {showImage ? <img src={image} alt="foto" className="showimage" /> : null}
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
                                <Form.Select required className="ubicacion-field" onChange={async(e) => await handleUbicacionChange(e)} name="edificios">
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
                            <Form.Label className="label-form-reporte">Piso</Form.Label>
                            <Form.Group>
                                <Form.Select required className="ubicacion-field" onChange={async (e) => await handleUbicacionChange(e)} name="pisos" disabled={!Boolean(pisos?.length)}>
                                    <option>~ Piso ~</option>
                                    {pisos?.map((piso) =>
                                        <option key={piso.id} value={piso.id}>{piso.descripcion}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Label className="label-form-reporte">Aula</Form.Label>
                            <Form.Group>
                                <Form.Select required className="ubicacion-field" onChange={async (e) => await handleUbicacionChange(e)} name="aulas" disabled={!Boolean(aulas?.length)}>
                                    <option>~ Aula ~</option>
                                    {aulas?.map((aula) =>
                                        <option key={aula.id} value={aula.id} >{aula.descripcion}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </Row>
                    <Row>
                        <div className="submit-row">
                            {image ?
                                <Button variant="outline-primary" 
                                    onMouseEnter={() => handleShowImage(true)} 
                                    onMouseLeave={() => handleShowImage(false)}
                                >Ver foto</Button> : ""
                            }
                            <Button variant="primary" onClick={() => setShowWebcam(!shoWwebcam)}>{!image ? "Agregar foto" : "Cambiar foto"}</Button>
                            <Form.Group>
                                <Button variant="primary" type="submit" disabled={!ubicacion.aulas || !incidente.importancia}>Reportar</Button>
                            </Form.Group>
                        </div>
                    </Row>
                    {
                        shoWwebcam && 
                        <div className="webcam-container">
                            <div className="inner-webcam-container">
                                <Webcam ref={webcamRef} className="webcam" mirrored screenshotFormat={"image/webp"}/>
                                <Button variant="primary" className="sacar-foto" onClick={handleSubmitFoto}>Sacar foto</Button>
                            </div>
                        </div>
                    }
                </Form>
            </Container>
        </>
    )
}

export default FormReportes