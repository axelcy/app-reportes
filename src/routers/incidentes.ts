import { Router } from 'express'
import { getAll, insert, update } from '../controllers/incidentes'

const routerIncidentes = Router()

routerIncidentes.get('/incidentes', getAll)
routerIncidentes.post('/incidentes', insert)
routerIncidentes.put('/incidentes', update)

export default routerIncidentes