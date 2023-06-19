import { createContext, useState } from "react"

export const UsuarioContext = createContext(null)

export const UsuarioProvider = ({ children }) => {
    // localStorage.removeItem('usuario')

    const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')))
    
    if (usuario === null) localStorage.removeItem('usuario')
    else localStorage.setItem('usuario', JSON.stringify(usuario))
    // console.log(JSON.parse(localStorage.getItem('usuario')))
    return (
        <UsuarioContext.Provider value={{usuario, setUsuario}}>
            {children}
        </UsuarioContext.Provider>
    )
}