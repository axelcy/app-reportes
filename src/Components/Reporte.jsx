import { Button } from 'react-bootstrap'
import useFetch from '../Hooks/useFetch'
import { useEffect, useState } from 'react'
import './Reporte.css'
import { IoInformationCircleSharp } from 'react-icons/io5'

const Reporte = ({ reporte }) => {
    const [foto, setFoto] = useState('')
    useEffect(() => async () => setFoto(await useFetch('/img/incidentes/' + reporte.foto)), [])

    return (
        <div className='reporte-container'>
            <div className='reporte-body'>
                <h6>{reporte.nombre}</h6>
                <p>{reporte.descripcion}</p>
            </div>
            <div className='foto-container-reporte'>
                <img src={foto} alt='foto' className='foto-reporte'/>
                <IoInformationCircleSharp className='icon-reporte'/>
            </div>
        </div>
    )
}

export default Reporte