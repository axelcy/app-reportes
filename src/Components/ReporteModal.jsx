import { useState, useEffect, useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useFetch from '../Hooks/useFetch';
import useUsuario from '../Hooks/useUsuario';
import './ReporteModal.css'

function ReporteModal({ show, setShow, reporte: reporteProp }) {
    if (!reporteProp) return

    const [reporte, setReporte] = useState({})
    const [image, setImage] = useState(null)
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
    const handleCheck = () => handleClose()

    return (
        <>
            <Modal show={show} onHide={handleClose} className='reporte-modal' size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{reporte?.usuario?.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='reporte-modal-body'>
                    <Row>
                        <Col sm={5}>
                            <img src={image} alt={reporteProp.nombre} className='modal-reporte-foto'/>
                        </Col>
                        <Col sm={7} className='modal-reporte-ubicacion'>
                            <Row>
                                <h3>Espacio: 1210 BIS</h3>
                            </Row>
                            <Row>
                                <p>Se rompió el ventilador XD</p>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='row2-modal-reporte'>
                        <p>{reporte.fecha}</p>
                        <p>{reporteProp.idUsuario}</p>
                    </Row>
                    <p>{reporteProp.id}</p>
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