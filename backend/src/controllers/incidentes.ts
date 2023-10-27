import IncidenteService from "../services/incidente-service"
import Incidente from '../models/Incidente'
import { __dirname } from "../../index"
import fs from "fs"

export const getAll = async(_req: any, _res: any) => {
    _res.send(await new IncidenteService().getAll())
}

export const getByUsuario = async(_req: any, _res: any) => {
    _res.send(await new IncidenteService().getByUsuario(Number(_req.params.idUsuario)))
}
export const getByEstado = async(_req: any, _res: any) => {
    _res.send(await new IncidenteService().getByEstado(Number(_req.params.idEstado)))
}

export const getByEdificio = async(_req: any, _res: any) => {
    _res.send(await new IncidenteService().getByEdificio(Number(_req.params.idEdificio)))
}

export const getByPiso = async(_req: any, _res: any) => {
    _res.send(await new IncidenteService().getByPiso(Number(_req.params.idPiso)))
}

export const getByAula = async(_req: any, _res: any) => {
    _res.send(await new IncidenteService().getByAula(Number(_req.params.idAula)))
}

export const deleteById = async(_req: any, _res: any) => {
    console.log('DELETE BY ID')
    _res.send(await new IncidenteService().deleteById(Number(_req.params.idPiso)))
}


export const insert = async(_req: any, _res: any) => {
    const incidente: Incidente = {..._req.body, foto: "incidente_ID.webp"}
    const newIncidente: Incidente = await new IncidenteService().insert(incidente)
    newIncidente.foto = `incidente_${newIncidente.id}.webp`
    await new IncidenteService().update(newIncidente)
    saveFileContentBase64Img(newIncidente.foto, _req.body.foto)
    _res.end(JSON.stringify(newIncidente))
}

export const update = async(_req: any, _res: any) => {
    const incidente: Incidente = _req.body
    const newIncidente: Incidente = await new IncidenteService().update(incidente)
    _res.end(JSON.stringify(newIncidente))
}

function saveFileContentBase64Img(fileName: string, srcBase64: string) {
    try {
        var cabecera = srcBase64.substring(0, 50)
    } catch {
        return false
    }
    // data:image/webp;base64,/
    if (cabecera.startsWith("data:")) {
        let posComa = cabecera.indexOf(",")
        srcBase64 = srcBase64.substring(posComa + 1)
    }
    try {
        fs.writeFileSync(`${__dirname}/public/images/incidentes/${fileName}`, srcBase64, 'base64')
    } catch {
        return false
    }
    return true
}