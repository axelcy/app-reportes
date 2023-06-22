import { Router } from 'express'
import { getAll, getByUsuario, insert, update } from '../controllers/incidentes'

const routerIncidentes = Router()

routerIncidentes.get('/incidentes', getAll)
routerIncidentes.get('/incidentes/:idUsuario', getByUsuario)
routerIncidentes.post('/incidentes', insert)
routerIncidentes.put('/incidentes', update)

export default routerIncidentes