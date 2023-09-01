import { Container, Row, Button, ToggleButton, ToggleButtonGroup, Form } from "react-bootstrap"
import { useEffect, useState, useRef } from "react"
import useFetch from "../Hooks/useFetch"
import NavBar from "../Components/NavBar"
import './Reportar.css'
import useUsuario from "../Hooks/useUsuario"
import Webcam, { Permissions } from "react-webcam"
import useFooter from "../Hooks/useFooter"
import { Link } from "react-router-dom"

const Reportar = () => {
    const { usuario } = useUsuario()
    const { footer, setFooter } = useFooter()
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

    const [cameraDevices, setCameraDevices] = useState([])
    const [selectedCamera, setSelectedCamera] = useState('')

    useEffect(() => async () => {
        setEdificios(await useFetch('/edificios'))
        setCategorias(await useFetch('/categorias'))

        const devices = await navigator.mediaDevices.enumerateDevices()
        const cameras = devices.filter(device => device.kind === 'videoinput')
        setCameraDevices(cameras)
        setSelectedCamera(cameras[0]?.deviceId || '')
    }, [])

    const handleSwitchCamera = () => {
        const currentIndex = cameraDevices.findIndex(device => device.deviceId === selectedCamera);
        const nextIndex = (currentIndex + 1) % cameraDevices.length;
        setSelectedCamera(cameraDevices[nextIndex].deviceId);
    }

    const checkCameraPermission = async () => {
        try {
            const permissionStatus = await navigator.permissions.query({ name: 'camera' });
            return permissionStatus.state === 'granted';
        } catch (error) {
            console.error('Error al verificar el permiso de la cámara:', error);
            return false;
        }
    }

    useEffect(() => {
        if (incidente.importancia) {
            document.getElementById("label-importancia").classList.remove("label-required")
        }
    },[incidente.importancia])

    useEffect(() => async() => {
        if (!shoWwebcam) {
            document.getElementsByTagName("body")[0].classList.remove("overflow-hidden")
        }
        else {
            document.getElementsByTagName("body")[0].classList.add("overflow-hidden")
            window.scrollTo({
                top: 0,
                left: 0,
            });
        }
    }, [shoWwebcam])

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
    const handleSubmitFoto = async() => {
        if (!(await checkCameraPermission())) {
            setFooter("Es necesario dar permisos de cámara para poder sacar la foto")
            return
        }
        setShowWebcam(false)
        const imageSrc = webcamRef.current.getScreenshot()
        // console.log(imageSrc.length)
        setImage(imageSrc)
    }
    const handleShowImage = mostrar => setShowImage(mostrar)

    if (!usuario && !import.meta.env.VITE_BYPASS) return (
        <>
            <NavBar />
            <h1>Acceso denegado</h1>
            <h4>Es necesario estar logeado para poder reportar</h4>
        </>
    )
    return (
        <>
            {/* <Link to={'/pantalla-verde'}></Link> */}
            <NavBar />
            <Container>
                <h2 className="text">Reportar</h2>
                {showImage ? <img src={image} alt="foto-reporte" className="showimage" /> : null}
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
                        <Form.Label className="label-form-reporte label-required" id="label-importancia">Nivel de importancia</Form.Label>
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
                        <div className="foto-row">
                            {image ?
                                <>
                                    <Button variant="success" onClick={() => handleShowImage(state => !state)}>Ver foto</Button>
                                    <Button variant="outline-primary" onClick={() => setImage(null)}>Eliminar foto</Button>
                                </>
                                : ""
                            }
                            <Button variant="primary" onClick={() => setShowWebcam(!shoWwebcam)}>{!image ? "Agregar foto" : "Cambiar foto"}</Button>
                            
                        </div>
                    </Row>
                    <Row>
                        <Form.Group>
                            <Button variant="primary" type="submit" disabled={!ubicacion.aulas || !incidente.importancia} className="reportar-button">Reportar</Button>
                        </Form.Group>
                    </Row>
                    {
                        shoWwebcam && 
                        <div className="webcam-container">
                            <div className="inner-webcam-container">
                                <Webcam ref={webcamRef} className="webcam"  screenshotFormat={"image/webp"}/>
                                <div className="webcam-buttons-container">
                                    <Button variant="success" onClick={handleSwitchCamera}>Cambiar Cámara</Button>
                                    <Button variant="secondary" className="sacar-foto" onClick={() => setShowWebcam(false)}>Cancelar</Button>
                                    <Button variant="primary" className="sacar-foto" onClick={handleSubmitFoto} >Sacar foto</Button>
                                </div>
                            </div>
                        </div>
                    }
                </Form>
            </Container>
        </>
    )
}   

export default Reportar