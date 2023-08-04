import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useFetch from '../Hooks/useFetch';
import useUsuario from '../Hooks/useUsuario';
import './ReporteModal.css'

function ReporteModal({ show, setShow, reporte }) {

    const getFoto = async() => await useFetch('/img/incidente/' + reporte.foto)
    const handleClose = () => setShow(false)
    const handleCheck = () => {
        handleClose()
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} className='reporte-modal' size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>{reporte.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={getFoto()} alt={reporte.nombre} />
                    <p>{reporte.foto}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="success" onClick={handleCheck}>Marcar hecho</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default ReporteModal