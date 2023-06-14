import { createContext, useState } from "react"

export const UsuarioContext = createContext(null)

export const UsuarioProvider = ({ children }) => {
    const [usuario, setUsuario] = useState("Hola")
    
    return (
        <UsuarioContext.Provider value={{usuario, setUsuario}}>
            {children}
        </UsuarioContext.Provider>
    )
}