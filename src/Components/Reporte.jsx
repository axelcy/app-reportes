import useFetch from '../Hooks/useFetch'
import { useEffect, useId, useRef, useState } from 'react'
import './Reporte.css'
import { IoInformationCircleSharp } from 'react-icons/io5'

const Reporte = ({ reporte }) => {
    const [foto, setFoto] = useState('')
    const fotoContainerId = useId()
    const newIconId = useId(null)
    useEffect(() => async () => setFoto(await useFetch('/img/incidentes/' + reporte.foto)), [])

    window.addEventListener('resize', () => {
        const fotoContainer = document.getElementById(fotoContainerId)
        const newIcon = document.getElementById(newIconId)
        if (!fotoContainer || !newIcon) return
        if (window.innerWidth > 570) { // PANTALLA GRANDE
            if (!fotoContainer.classList.contains('d-none') && newIcon.classList.contains('d-none')) return
            // console.log('agregando d-none')
            fotoContainer.classList.remove('d-none')
            newIcon.classList.add('d-none')
        } else { // PANTALLA CHICA
            if (fotoContainer.classList.contains('d-none') && !newIcon.classList.contains('d-none')) return
            // console.log('removiendo d-none')
            fotoContainer.classList.add('d-none')
            newIcon.classList.remove('d-none')
        }
    })

    return (
        <div className='reporte-container'>
            <div className='reporte-body'>
                <h4>{reporte.nombre}</h4>
                <p>{reporte.descripcion}</p>
            </div>
            <div className='foto-container-reporte' id={fotoContainerId}>
                <img src={foto} alt='foto' className='foto-reporte'/>
                <IoInformationCircleSharp className='icon-reporte'/>
            </div>
            <IoInformationCircleSharp className='icon-reporte' id={newIconId} />
        </div>
    )
}

export default Reporte