import AulaService from "../services/aula-service"

export const getAll = async(_req: any, _res: any) => {
    _res.send(await new AulaService().getAll())
}

export const getById = async(_req: any, _res: any) => {
    _res.send(await new AulaService().getById(Number(_req.params.id)))
}

export const getByPiso = async(_req: any, _res: any) => {
    _res.send(await new AulaService().getByPiso(Number(_req.params.id)))
}

export const getByPisoAula = async(_req: any, _res: any) => {
    _res.send(await new AulaService().getByPisoAula(Number(_req.params.idPisoAula)))
}