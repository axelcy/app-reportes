import { useState, useEffect, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useFetch from '../Hooks/useFetch';
import useUsuario from '../Hooks/useUsuario';
import './ReporteModal.css'

function ReporteModal({ show, setShow, reporte }) {
    if (!reporte) return

    const [image, setImage] = useState(null)
    useEffect(() => async () => setImage(await useFetch('/img/incidentes/' + reporte.foto)), [])

    const handleClose = () => setShow(false)
    const handleCheck = () => handleClose()

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
                        </Col>
                        <Col sm={7} className='modal-reporte-importancia'>
                            <h3>Importancia</h3>
                        </Col>
                    </Row>
                    <p>{reporte.id}</p>
                    {/* <p>{JSON.stringify(reporte)}</p> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="success" onClick={handleCheck}>Marcar hecho</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ReporteModal