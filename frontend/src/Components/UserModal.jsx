import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useFetch from '../Hooks/useFetch';
import useUsuario from '../Hooks/useUsuario';
import './UserModal.css'

function UserModal({ show, setShow }) {
  const { usuario, setUsuario } = useUsuario()

  const handleSupervisor = async() => {
    let newState = 0
    if (usuario.esSupervisor !== 1) newState = 1 
    const newUsuario = await useFetch('/usuarios', {...usuario, esSupervisor: newState}, 'PUT')
    setUsuario(newUsuario)
    console.log('newUsuario', newUsuario)
  }
  const handleAdmin = async() => {
    let newState = 0
    if (usuario.esSupervisor !== 2) newState = 2
    const newUsuario = await useFetch('/usuarios', {...usuario, esSupervisor: newState}, 'PUT')
    setUsuario(newUsuario)
    console.log('newUsuario', newUsuario)
    console.log('newState', newState)
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
            <p>Es supervisor: {usuario.esSupervisor === 1 ? 'Si' : 'No'}</p>
            <p>Es admin: {usuario.esSupervisor === 2 ? 'Si' : 'No'}</p>
            <button onClick={async() => await handleSupervisor()}>Set supervisor</button>
            <button onClick={async() => await handleAdmin()}>Set admin</button>
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