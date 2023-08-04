import useFetch from '../Hooks/useFetch'
import { useEffect, useId, useRef, useState } from 'react'
import './Reporte.css'
import { IoInformationCircleSharp } from 'react-icons/io5'

const Reporte = ({ reporte, onClick }) => {
    const [foto, setFoto] = useState('')
    const fotoContainerId = useId()
    const fotoId = useId()
    const newIconId = useId()
    const containerId = useId()

    useEffect(() => async () => {
        setFoto(await useFetch('/img/incidentes/' + reporte.foto))
        resizeEvent()
    }, [])

    const resizeEvent = () => {
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
    }

    window.addEventListener('resize', resizeEvent)

    const handleOpen = e => {
        // si es pantalla grande y el id no es el de la foto no hacer nada 
        // if (window.innerWidth > 570 && e.target.id !== fotoId) return
        console.log('abriendo modal: ' + reporte.nombre)
        if(onClick) onClick()
    }

    return (
        <div className='reporte-container' onClick={handleOpen} id={containerId}>
            <input type="checkbox" className='check'/>
            <div className='reporte-body'>
                <h4>{reporte.nombre}</h4>
                <p>{reporte.descripcion} - Importancia: {reporte.importancia} - Edificio {reporte.idPisoAula}</p>
            </div>
            <div className='foto-container-reporte d-none' id={fotoContainerId}>
                <img src={foto} alt={reporte.foto.split('.')[0]} className='foto-reporte no-select' id={fotoId} onClick={handleOpen} draggable="false" />
                <IoInformationCircleSharp className='icon-reporte'/>
            </div>
            <IoInformationCircleSharp className='icon-reporte d-none' id={newIconId} />
        </div>
    )
}

export default Reporte