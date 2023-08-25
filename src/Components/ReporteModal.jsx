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
        setReporte({
            ...reporteProp,
            foto: setImage(await useFetch('/img/incidentes/' + reporteProp.foto)),
            fecha: reporteProp.fecha.split('T')[0].replace(/-/g, '/'),
            usuario: await useFetch('/usuarios/' + reporteProp.idUsuario),
            aula: await useFetch('/aula/pisoaula/' + reporteProp.idPisoAula),
        })
        console.log(await useFetch('/usuarios/' + reporteProp.idUsuario))
    }, [])
    useEffect(() => console.log(reporteProp), [])

    const handleClose = () => setShow(false)
    const handleSave = () => {
        // useFetch('/incidente', {...reporte}, 'PUT')
        handleClose()
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} className='reporte-modal' size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{reporte.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='reporte-modal-body'>
                    <Row>
                        <Col sm={5}>
                            <img src={image} alt={reporte.nombre} className='modal-reporte-foto'/>
                            <Row className='row2-modal-reporte'>
                                <span>Fecha: {reporte.fecha}</span>
                                <span>Usuario: {reporte?.usuario?.nombre}</span>
                            </Row>
                            <Row className='row3-modal-reporte'>
                                <h4>Importancia</h4>
                                <Form.Range step={1} max={3} min={1} defaultValue={reporte.importancia} className='range-modal-reporte' />
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
                                    <Form.Control type="text" autoComplete="off" required name="nombre" defaultValue={reporte.nombre} /> {/* value={incidente.nombre} */}
                                    <Form.Label>Nombre</Form.Label>
                                </Form.Group>
                            </Row>
                            <Row>
                                {/* <Form.Control as="textarea" placeholder="Descripción" defaultValue={reporte.descripcion}/> */}
                                <Form.Group className="mb-3 animated-input" autoComplete="off" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" rows={3} required name="descripcion" defaultValue={reporte.descripcion} /> {/* value={incidente.descripcion} */}
                                    <Form.Label>Descripción</Form.Label>
                                </Form.Group>
                            </Row>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="success" onClick={handleSave}>Guardar</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ReporteModal