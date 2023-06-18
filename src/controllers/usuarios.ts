import UsuarioService from "../services/usuario-service"
import Usuario from '../models/Usuario'

export const getAll = async(_req: any, _res: any) => {
    _res.send(await new UsuarioService().getAll())
}

export const getById = async(_req: any, _res: any) => {
    _res.send(await new UsuarioService().getById(Number(_req.params.id)))
}

export const getByName = async(_req: any, _res: any) => {
    _res.send(await new UsuarioService().getByName(_req.params.nombre))
}

export const getByEmail = async(_req: any, _res: any) => {
    _res.send(await new UsuarioService().getByEmail(_req.params.email))
}
export const insert = async(_req: any, _res: any) => {
    const usuario: Usuario = _req.body
    const results = await new UsuarioService().insert(usuario)
    _res.end(JSON.stringify(results))
}