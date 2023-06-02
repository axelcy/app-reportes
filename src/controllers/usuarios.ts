import UsuarioService from "../services/usuario-service"

export const getAll = async(_req: any, _res: any) => {
    _res.send(await new UsuarioService().getAll())
}

export const getById = async(_req: any, _res: any) => {
    _res.send(await new UsuarioService().getById(Number(_req.params.idAula)))
}

export const getByName = async(_req: any, _res: any) => {
    _res.send(await new UsuarioService().getByName(_req.params.nombre))
}