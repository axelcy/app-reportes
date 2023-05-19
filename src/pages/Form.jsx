import NavBar from "../Components/NavBar"
import Form from 'react-bootstrap/Form';
import { Container, Row } from "react-bootstrap";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import './Form.css'

const FormReportes = () => {

    return (
        <>
            <NavBar />
            <Container>
                <h2>Formulario reporte</h2>
                <Form>
                    <Row>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Nombre" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Label>Nivel de importancia</Form.Label>
                        <ToggleButtonGroup type="radio" name="options">
                            <ToggleButton id="tbg-radio-1" value={1} variant={'success'} > Bajo </ToggleButton>
                            <ToggleButton id="tbg-radio-2" value={2} variant={'warning'} > Medio </ToggleButton>
                            <ToggleButton id="tbg-radio-3" value={3} variant={'danger'} > Alto </ToggleButton>
                        </ToggleButtonGroup>
                    </Row>
                    <Row>
                        <Form.Label>Categoría</Form.Label>
                        <Form.Group>
                            <Form.Select>
                                <option>Electricidad</option>
                                <option>Informática</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Row className="form-epa">
                        <div>
                            <Form.Label>Edificio</Form.Label>
                            <Form.Group>
                                <Form.Select>
                                    <option></option>
                                    <option>Yatay 1</option>
                                    <option>Río 2</option>
                                    <option>Río 3</option>
                                    <option>Yatay 4</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div>
                        <Form.Label>Piso</Form.Label>
                            <Form.Group>
                                <Form.Select>
                                    <option></option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Label>Aula</Form.Label>
                            <Form.Group>
                                <Form.Select>
                                    <option></option>
                                    <option>1101</option>
                                    <option>1102</option>
                                    <option>1103</option>
                                    <option>1104</option>
                                </Form.Select>
                            </Form.Group>
                        </div>
                        
                    </Row>
                </Form>
            </Container>
        </>
    )
}

export default FormReportes