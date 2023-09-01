import useFetch from '../Hooks/useFetch'
import { useEffect, useId, useRef, useState } from 'react'
import './Reporte.css'
import { IoInformationCircleSharp } from 'react-icons/io5'
import ReporteModal from './ReporteModal'

const Reporte = ({ reporte }) => {

    const [modalShow, setModalShow] = useState(false)
    // const [reporteModal, setReporteModal] = useState(null)

    const [foto, setFoto] = useState('')
    const fotoContainerId = useId()
    const fotoId = useId()
    const newIconId = useId()
    const containerId = useId()
    const [pantallaGrande, setPantallaGrande] = useState(null)

    useEffect(() => async () => {
        setFoto(await useFetch('/img/incidentes/' + reporte.foto))
        resizeEvent()
    }, [])

    const resizeEvent = () => {
        const fotoContainer = document.getElementById(fotoContainerId)
        const newIcon = document.getElementById(newIconId)
        if (!fotoContainer || !newIcon) return
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

    const handleOpen = checkScreen => {
        // si es pantalla grande y el id no es el de la foto no hacer nada 
        // if (window.innerWidth > 570 && e.target.id !== fotoId) return
        // if (checkScreen === true && pantallaGrande) return null
        console.log('abriendo modal: ' + reporte.nombre)
        setModalShow(show => !show)
    }

    return (
        <>
            <ReporteModal show={modalShow} setShow={setModalShow} reporte={reporte} />
            <div className='reporte-container' onClick={() => handleOpen(true)} id={containerId}>
                {pantallaGrande ? <span className='reporte-texto-id'>Reporte #{reporte.id}</span> : <span className='reporte-texto-id2'>Reporte #{reporte.id}</span>}
                <div className='reporte-body'>
                    <h4>{reporte.nombre}</h4>
                    <p>Importancia <b>{reporte.importancia}</b> - Edificio <b>{reporte.idPisoAula}</b></p>
                </div>
                <div className='foto-container-reporte d-none' id={fotoContainerId} onClick={handleOpen}>
                    <img src={foto} alt={reporte.foto.split('.')[0]} className='foto-reporte no-select' id={fotoId} draggable="false" />
                    <IoInformationCircleSharp className='icon-reporte'/>
                </div>
                <IoInformationCircleSharp className='icon-reporte d-none' id={newIconId} />
            </div>
        </>
    )
}

export default Reporte