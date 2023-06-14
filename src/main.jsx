import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import FormReportes from './pages/Form.jsx'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { UsuarioProvider } from './context/usuario.jsx'
import { Footer } from './Components/Footer.jsx'
import { TestProvider } from './context/test.jsx'


const routes = createBrowserRouter([{
  path: "/",
  element: <App />
},{
  path: "/form",
  element: <FormReportes />
}])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TestProvider>
      <UsuarioProvider>
        <RouterProvider router={routes}/>
        <Footer />
      </UsuarioProvider>
    </TestProvider>
  </StrictMode>,
)