import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import FormReportes from './pages/Form.jsx'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { UsuarioProvider } from './context/usuarioContext.jsx'
import { Footer } from './Components/Footer.jsx'
import { FooterProvider } from './context/footerContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const routes = createBrowserRouter([{
  path: "/",
  element: <App />
},{
  path: "/form",
  element: <FormReportes />
}])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FooterProvider>
      <UsuarioProvider>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <RouterProvider router={routes}/>
          <Footer />
        </GoogleOAuthProvider>
      </UsuarioProvider>
    </FooterProvider>
  </StrictMode>,
)
