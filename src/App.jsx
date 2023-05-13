import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'

function App() {

  const [data, setData] = useState()
  const useFetch = async(endpoint) => {
    try {
      const response = await fetch(`http://localhost:3001${endpoint}`)
      return await response.json()
    }
    catch (err) {
      console.log(err)
      throw new Error("No se pudo realizar el fetch :(")
    }
  }
  // useEffect(() => setData(["Prueba", "test"]), [])

  return (
    <>
      <Link to={"/test"}><h1>Hello World!</h1></Link>
      <button onClick={async() => setData(await useFetch("/edificios"))}>Traer datos</button>
      <p>{data && JSON.stringify(data)}</p>
    </>
  )
}

export default App
