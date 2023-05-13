import { useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import Navbar from './Components/NavBar'
import useFetch from './Hooks/useFetch'

function App() {
  const [data, setData] = useState()

  return (
    <>
      <Navbar setData={setData} />
      <Link to={"/test"}><h1>Hello World!</h1></Link>
      <button onClick={async() => setData(await useFetch("/edificios"))}>Traer edificios</button>
      <p>{data && JSON.stringify(data)}</p>
      {typeof data == 'string' && data.split(import.meta.env.VITE_URL_API)[1].startsWith('/img/') && <img className='img' src={data}/>}
    </>
  )
}

export default App
