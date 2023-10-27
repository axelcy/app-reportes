import { useState, useEffect, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Button, Form, Modal } from 'react-bootstrap';
import useFetch from '../Hooks/useFetch';
import useUsuario from '../Hooks/useUsuario';
import './ReporteModal.css'

function ReporteModal({ show, setShow, reporte: reporteProp }) {
    if (!reporteProp) return

    const [reporte, setReporte] = useState({})
    const [image, setImage] = useState(null)
    const [editMode, setEditMode] = useState(false)
    useEffect(() => async () => {
        setImage(await useFetch('/img/incidentes/' + reporteProp.foto))
        setReporte({
            ...reporteProp,
            foto: reporteProp.foto,
            usuario: await useFetch('/usuarios/' + reporteProp.idUsuario),
            aula: await useFetch('/aula/pisoaula/' + reporteProp.idPisoAula),
        })
    }, [])
    // useEffect(() => console.log(reporteProp), [])
    const handleChange = e => setReporte(reporte => ({...reporte, [e.target.name]: e.target.value}))
    const handleClose = () => setShow(false)
    const handleSave = async() => {
        // console.log({...reporte, foto: reporteProp.foto})
        await useFetch('/incidentes', {...reporte}, 'PUT')
        window.location.reload()
    }
    const handleDelete = async() => {
        // return
        console.log('/incidentes/' + reporteProp.id)
        await useFetch('/incidentes/' + reporteProp.id, null , 'DELETE')
        // window.location.reload()
    }
    const handleSolucionado = async() => {
        console.log({...reporte})
        await useFetch('/incidentes',  {...reporte, estado: 2 } , 'PUT')
        window.location.reload()
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} className='reporte-modal' size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{reporteProp.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='reporte-modal-body'>
                    <Row>
                        <Col sm={5}>
                            <img src={image} alt={reporteProp.nombre} className='modal-reporte-foto'/>
                            <Row className='row2-modal-reporte'>
                                <span>Reporte #{reporte.id}</span>
                                {/* <span>Fecha: {reporte.fecha?.split('T')[0].replace(/-/g, '/')}</span> */}
                                <span>Fecha: {reporte.fecha?.split('T')[0].split('-').reverse().join('/')}</span>
                                <span>Usuario: {reporte?.usuario?.nombre}</span>
                                <span>Ubicación: {reporte?.aula?.descripcion}</span>
                            </Row>
                            <Row className='row3-modal-reporte'>
                                <h4>Importancia</h4>
                                <Form.Range step={1} max={3} min={1} name='importancia' onChange={handleChange} defaultValue={reporte.importancia} className='range-modal-reporte' />
                                <div className='importancia-modal-texto'>
                                    <span>Baja</span> 
                                    <span>Media</span> 
                                    <span>Alta</span>
                                </div>
                            </Row>
                        </Col>
                        <Col sm={7} className='modal-reporte-ubicacion'>
                            <Row>
                                <Form.Group className="mb-3 animated-input" controlId="exampleForm.ControlInput1">
                                    <Form.Control type="text" autoComplete="off" required name="nombre" defaultValue={reporte.nombre} onChange={handleChange} /> {/* value={incidente.nombre} */}
                                    <Form.Label>Nombre</Form.Label>
                                </Form.Group>
                            </Row>
                            <Row>
                                {/* <Form.Control as="textarea" placeholder="Descripción" defaultValue={reporte.descripcion}/> */}
                                <Form.Group className="mb-3 animated-input" autoComplete="off" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" rows={3} required name="descripcion" defaultValue={reporte.descripcion} onChange={handleChange} /> {/* value={incidente.descripcion} */}
                                    <Form.Label>Descripción</Form.Label>
                                </Form.Group>
                            </Row>
                            <Row className='row-cierre-reporte'>
                                {/* <Form.Control as="textarea" placeholder="Descripción" defaultValue={reporte.descripcion}/> */}
                                <h4>¿Querés eliminar el reporte?</h4>
                                <Form.Group className="mb-3 animated-input animated-input-2" autoComplete="off" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" rows={3} required name="razon" defaultValue={''} onChange={handleChange} /> {/* value={incidente.descripcion} */}
                                    <Form.Label>Razón de cierre</Form.Label>
                                </Form.Group>
                                <Button variant="danger" onClick={handleDelete} className='button-cerrar-reporte'>Cerrar reporte</Button>
                            </Row>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleSolucionado}>Solucionado</Button>
                    <div className='separacion-modal-reporte'></div>
                    <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
                    {/* <Button variant="info" onClick={handleSolucionado}>Solucionado</Button> */}
                    <Button variant="success" onClick={handleSave}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ReporteModal