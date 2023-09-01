import { Button } from "react-bootstrap";
import NavBar from "../Components/NavBar";
import './PantallaVerde.css'

export default function PantallaVerde() {

    return (
        <>
        <NavBar />
        <main className="pantalla-verde">
            <Button>Volver a reportar</Button>
            <Button>Ver mis reportes</Button>
        </main>
        </>
    )
}