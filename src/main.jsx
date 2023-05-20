import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import FormReportes from './pages/Form.jsx'
import useFetch from './Hooks/useFetch.js'

const routes = createBrowserRouter([{
  path: "/",
  element: <App />
},{
  path: "/form",
  element: <FormReportes />
}])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
