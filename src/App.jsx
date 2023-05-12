import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function App() {

  const [data, setData] = useState([])
  const useFetch = async(endpoint) => {
    try {
      const response = fetch(`https://localhost${endpoint}`)
      return await response.json()
    }
    catch (err) {
      console.log(err)
      throw new Error("No se pudo realizar el fetch a la api")
    }
  }
  useEffect(() => async() => {
    setData(["Prueba", "test"])
  }, [])

  return (
    <>
      <h1>Hello World!</h1>
      <Link to={"/test"}>Test</Link>
      <p>{data && JSON.stringify(data)}</p>
    </>
  )
}

export default App
