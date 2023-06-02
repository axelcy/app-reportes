import IncidenteService from "../services/incidente-service"
import Incidente from '../models/Incidente'

export const getAll = async(_req: any, _res: any) => {
    _res.send(await new IncidenteService().getAll())
}

export const insert = async(_req: any, _res: any) => {
    const incidente: Incidente = _req.body
    // console.log(incidente)
    const results = await new IncidenteService().insert(incidente)
    _res.end(JSON.stringify(results))
}