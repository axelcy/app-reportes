import { useEffect, useState } from 'react'
import './App.css'

function App() {

  cosnt [data, setData] = useState([])
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
  useEffect(async() => setData(await useFetch("/Edificios"), []))
  return (
    <>
      <h1>Hello World!</h1>
      <p>{data ? JSON.stringify(data) : "..."}</p>
    </>
  )
}

export default App
