import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavBar from "../Components/NavBar";
import './PantallaVerde.css'

export default function PantallaVerde() {

    return (
        <>
        <NavBar />
        <main className="pantalla-verde">
            <div>
            <img src="/tick-verde.png" className="tick-verde"/>
            </div>
            <div className="buttons-pantalla-verde">
            <Button className="button-pverde"><Link to={'/reportar'} className='link-pverde'>Volver a reportar</Link></Button>
            <Button className="button-pverde"><Link to={'/mis-reportes'} className='link-pverde'>Ver mis reportes</Link></Button>
            </div>
        </main>
        </>
    )
}