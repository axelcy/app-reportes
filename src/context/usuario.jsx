import { createContext, useState } from "react"

export const UsuarioContext = createContext(null)

export const UsuarioProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null)
    
    return (
        <UsuarioContext.Provider value={usuario}>
            {children}
        </UsuarioContext.Provider>
    )
}