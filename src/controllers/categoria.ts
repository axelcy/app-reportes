import CategoriaService from "../services/categoria-service"

export const getAll = async(_req: any, _res: any) => {
    _res.send(await new CategoriaService().getAll())
}

export const getById = async(_req: any, _res: any) => {
    _res.send(await new CategoriaService().getById(Number(_req.params.id)))
}