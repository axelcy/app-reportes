import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import './App.css'
import Navbar from './Components/NavBar'
import useFetch from './Hooks/useFetch'
import Tabla from './Components/Tabla'

function App() {
  const [data, setData] = useState()

  return (
    <Container  fluid className='AppContainer'>
      <Navbar setData={setData} />
      <h1>App reportes</h1>
      <Link to={"/test"}><h3>Ir a /test</h3></Link>
      <Row>
        <Col xs={4}>
          <button onClick={async() => setData(await useFetch("/edificios"))}>Traer edificios</button>
          <p>{data && JSON.stringify(data)}</p>
          {typeof data == 'string' && data.split(import.meta.env.VITE_URL_API)[1].startsWith('/img/') && <img className='img' src={data}/>}
        </Col>
        <Col xs={8}>
          <Tabla />
        </Col>
      </Row>
    </Container>
  )
}

export default App
