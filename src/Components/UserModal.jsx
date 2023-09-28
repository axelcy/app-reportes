import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useFetch from '../Hooks/useFetch';
import useUsuario from '../Hooks/useUsuario';
import './UserModal.css'

function UserModal({ show, setShow }) {
  const { usuario, setUsuario } = useUsuario()

  const handleSupervisor = async() => {
    const newUsuario = await useFetch('/usuarios', {...usuario, esSupervisor: !usuario.esSupervisor}, 'PUT')
    setUsuario(newUsuario)
    console.log('newUsuario', newUsuario)
  }

  const handleClose = () => setShow(false)
  const handleLogOut = () => {
    setUsuario(null)
    handleClose()
    location.reload()
  }
  // useEffect(() => console.log(usuario), [])
  if (!usuario) return null
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
            <button onClick={async() => await handleSupervisor()}>Switch supervisor</button>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={handleLogOut} style={{width: "fit-content"}} className='form-control' variant='outline-secondary'>Log out</Button>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          {/* <Button variant="primary" onClick={handleClose}>Save Changes</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default UserModal