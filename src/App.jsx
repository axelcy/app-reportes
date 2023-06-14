import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import './App.css'
import Navbar from './Components/NavBar'
import Tabla from './Components/Tabla'
import useUsuario from './Hooks/useUsuario'

function App() {
  const [data, setData] = useState()
  const { usuario, setUsuario } = useUsuario()

  return (
    <>
      <Navbar />
      <h1>App reportes</h1>
      <Link to={"/form"}><h3>Ir a /form</h3></Link>
      <Container fluid>
        <Row>
          <Col xs={4}>
            <h3>/img/el-pepe.jpg</h3> {/* DATA */}
            <p>{data && JSON.stringify(data)}</p>
            {typeof data == 'string' && data.split(import.meta.env.VITE_URL_API)[1].startsWith('/img/') && <img className='img' src={data}/>}
          </Col>
          <Col xs={8}>
            <Tabla />
            <Tabla />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
