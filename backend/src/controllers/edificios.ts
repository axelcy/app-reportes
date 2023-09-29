import EdificioService from "../services/edificio-service"

export const getAll = async(_req: any, _res: any) => {
    _res.send(await new EdificioService().getAll())
}

export const getById = async(_req: any, _res: any) => {
    _res.send(await new EdificioService().getById(Number(_req.params.id)))
}


export const getByPisoAula = async(_req: any, _res: any) => {
    _res.send(await new EdificioService().getByPisoAula(Number(_req.params.idPisoAula)))
}