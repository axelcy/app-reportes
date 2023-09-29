import PisoService from "../services/piso-service"

export const getAll = async(_req: any, _res: any) => {
    _res.send(await new PisoService().getAll())
}

export const getById = async(_req: any, _res: any) => {
    _res.send(await new PisoService().getById(Number(_req.params.id)))
}

export const getByEdificio = async(_req: any, _res: any) => {
    _res.send(await new PisoService().getByEdificio(Number(_req.params.id)))
}