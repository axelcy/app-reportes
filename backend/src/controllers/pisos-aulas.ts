import PisoAulaService from "../services/pisoaula-service"

export const getAll = async(_req: any, _res: any) => {
    _res.send(await new PisoAulaService().getAll())
}

export const getByAula = async(_req: any, _res: any) => {
    _res.send(await new PisoAulaService().getByAula(Number(_req.params.idAula)))
}