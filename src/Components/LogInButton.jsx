import { GoogleLogin } from '@react-oauth/google'
import jwt_decode from "jwt-decode"
import useUsuario from "../Hooks/useUsuario"
import useFetch from "../Hooks/useFetch"
import useFooter from '../Hooks/useFooter'

const LogInButton = ({ onClick }) => {
    const { usuario, setUsuario } = useUsuario()
    const { footer, setFooter } = useFooter()

    const handleSuccessLogin = async(credentialResponse) => {
        const { credential } = credentialResponse
        let decodedUser = await jwt_decode(credential)

        if (!import.meta.env.VITE_DOMINIO) ''
        else if (decodedUser.email.split('@')[1] !== import.meta.env.VITE_DOMINIO) { // 'est.ort.edu.ar'
            setFooter(`el dominio del mail tiene que ser @${import.meta.env.VITE_DOMINIO}`)
            return
        }

        try {
            const dbUser = await useFetch('/usuarios/email/' + decodedUser.email)
            setUsuario(dbUser)
        } catch {
            const newUser = {
                nombre: decodedUser.given_name,
                apellido: decodedUser.family_name,
                email: decodedUser.email,
                foto: decodedUser.picture,
                esSupervisor: false,
            }
            const newDbUser = await useFetch('/usuarios', newUser)
            setUsuario(newDbUser)
        }
    }

    return (
        <GoogleLogin onSuccess={credentialResponse => handleSuccessLogin(credentialResponse)} />
    )
}

export default LogInButton