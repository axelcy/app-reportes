import useFetch from '../Hooks/useFetch'
import { useEffect, useState } from 'react'
import './Usuario.css'
import { Button, Form, Modal, Col, Row } from 'react-bootstrap';
import useUsuario from '../Hooks/useUsuario';

const Usuario = ({ usuario: usuarioProp }) => {
    const { usuario } = useUsuario()

    const [pantallaGrande, setPantallaGrande] = useState(null)

    useEffect(() => async () => {
        resizeEvent()
    }, [])

    

    const resizeEvent = () => {
        try {
            if (window.innerWidth > 570) { // PANTALLA GRANDE
                setPantallaGrande(true)
                if (!fotoContainer.classList.contains('d-none') && newIcon.classList.contains('d-none')) return
                // console.log('agregando d-none')
                fotoContainer.classList.remove('d-none')
                newIcon.classList.add('d-none')
            } else { // PANTALLA CHICA
                setPantallaGrande(false)
                if (fotoContainer.classList.contains('d-none') && !newIcon.classList.contains('d-none')) return
                // console.log('removiendo d-none')
                fotoContainer.classList.add('d-none')
                newIcon.classList.remove('d-none')
            }
        }
        catch (err) {

        }
    }

    window.addEventListener('resize', resizeEvent)
    const handleUserState = async(e) => {
        const user = await useFetch('/usuarios/' + usuarioProp.id)
        console.log(user)
        const newUsuario = await useFetch('/usuarios', {...user, esSupervisor: Number(e.target.value)}, 'PUT')
    }

    if (usuario.id === usuarioProp.id) return
    return (
        <>
            <div className='reporte-container' >
                {pantallaGrande ? <span className='user-texto-id'>Usuario #{usuarioProp.id}</span> : <span className='user-texto-id2'>Usuario #{usuarioProp.id}</span>}
                <div className='usuario-body'>
                    <img className='logo user-foto' alt='foto-usuario' src={usuarioProp.foto} />
                    <div className='range-usuario'>
                    <h4>{usuarioProp.nombre}</h4>
                        {/* Cambiar Permisos */}
                        <div className='range-container'>
                        <Form.Range step={1} max={2} min={0} name='importancia' onChange={async(e) => await handleUserState(e)} defaultValue={usuarioProp.esSupervisor} className='range-modal-user' />
                            <div className='importancia-modal-texto'>
                                <span>Usuario</span> 
                                <span>Supervisor</span> 
                                <span>Administrador</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Usuario