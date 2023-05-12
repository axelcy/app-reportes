import { StrictMode } from 'react'
import { render } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const routes = createBrowserRouter([{
  path: "/",
  element: <App />
},{
  path: "/test",
  element: <h1>/Test</h1>
}])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes}/>
  </StrictMode>,
)
