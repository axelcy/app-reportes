import useFetch from '../Hooks/useFetch'
import { useEffect, useState } from 'react'
import './Reporte.css'

const Usuario = ({ usuario }) => {

    const [pantallaGrande, setPantallaGrande] = useState(null)

    useEffect(() => async () => {
        resizeEvent()
    }, [])  

    const resizeEvent = () => {
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

    window.addEventListener('resize', resizeEvent)

    return (
        <>
            <div className='reporte-container' >
                {pantallaGrande ? <span className='reporte-texto-id'>Usuario #{usuario.id}</span> : <span className='reporte-texto-id2'>Usuario #{usuario.id}</span>}
                <div className='reporte-body'>
                    <h4>{usuario.nombre}</h4>
                </div>
            </div>
        </>
    )
}

export default Usuario