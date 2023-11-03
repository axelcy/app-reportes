import { useContext } from "react"
import { UsuarioContext } from "../context/usuarioContext"

export default function useUsuario() {
    try {
        const { usuario, setUsuario } = useContext(UsuarioContext)
        // if (usuario === undefined) throw new Error()
        return { usuario, setUsuario }
    }
    catch {
        throw new Error("useUsuario debe estar dentro del provider UsuarioContext")
    }
}