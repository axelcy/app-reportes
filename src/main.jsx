import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Reportar from './pages/Reportar.jsx'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { UsuarioProvider } from './context/usuarioContext.jsx'
import { Footer } from './Components/Footer.jsx'
import { FooterProvider } from './context/footerContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import MisReportes from './pages/MisReportes.jsx'
import VerReportes from './pages/VerReportes.jsx'

const router = createHashRouter([{
  path: "/",
  element: <App />
},{
  path: "/reportar",
  element: <Reportar />
},{
  path: "/mis-reportes",
  element: <MisReportes />
},{
  path: "/ver-reportes",
  element: <VerReportes />
}])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FooterProvider>
      <UsuarioProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <RouterProvider router={router}/>
          <Footer />
        </GoogleOAuthProvider>
      </UsuarioProvider>
    </FooterProvider>
  </StrictMode>,
)
