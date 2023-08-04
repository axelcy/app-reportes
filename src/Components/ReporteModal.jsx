import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useUsuario from '../Hooks/useUsuario';
import './UserModal.css'

function ReporteModal({ show, setShow, reporte }) {
  const { usuario, setUsuario } = useUsuario()

  const handleClose = () => setShow(false)
  const handleLogOut = () => {
    setUsuario(null)
    handleClose()
    location.reload()
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hola <b>{usuario.nombre}</b>!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <img className='user-foto-modal' src={usuario.foto} alt='foto-usuario' />
            <p>ID: {usuario.id}</p>
            <p>Nombre: {usuario.nombre}</p>
            <p>Apellido: {usuario.apellido}</p>
            <p>Email: {usuario.email}</p>
            <p>Es supervisor: {usuario.esSupervisor ? 'Si' : 'No'}</p>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={handleLogOut} style={{width: "fit-content"}} className='form-control' variant='outline-secondary'>Log out</Button>
          <Button variant="secondary" onClick={handleClose}>Marcar hecho</Button>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          {/* <Button variant="primary" onClick={handleClose}>Save Changes</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ReporteModal