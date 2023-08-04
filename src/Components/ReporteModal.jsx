import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useFetch from '../Hooks/useFetch';
import useUsuario from '../Hooks/useUsuario';
import './ReporteModal.css'

function ReporteModal({ show, setShow, reporte }) {
    if (!reporte) return
    const [foto, setFoto] = useState('')
    const image = useRef()
    
    useEffect(() => async () => {
        let imageSrc = await useFetch('/img/incidentes/' + reporte.foto)
        // image.current.setAttribute('src', foto2)
        let image = <img src={imageSrc} alt={reporte.nombre} className='modal-reporte-foto'/>
        setFoto(image)
    }, [reporte])
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
                <Modal.Body className='reporte-modal-body'>
                    {foto}
                    {/* {foto && <img src={foto} alt={reporte.nombre} className='modal-reporte-foto' ref={image}/>} */}
                    {/* <p>{reporte.foto}</p> */}
                    <p>{reporte.id}</p>
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