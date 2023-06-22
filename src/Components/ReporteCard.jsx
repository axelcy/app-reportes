import { Button, Card } from 'react-bootstrap'
import useFetch from '../Hooks/useFetch'
import { useEffect, useState } from 'react'

const ReporteCard = ({ reporte }) => {
    const [foto, setFoto] = useState('')
    useEffect(() => async () => setFoto(await useFetch('/img/incidentes/' + reporte.foto)), [])

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={foto} />
            <Card.Body>
                <Card.Title>{reporte.nombre}</Card.Title>
                <Card.Text>
                    {reporte.descripcion}
                </Card.Text>
                {/* poner un modal con los detalles del reporte */}
                <Button variant="primary">Ver detalles</Button>
            </Card.Body>
        </Card>
    )
}

export default ReporteCard