import { Router } from 'express'
import { getAll, insert } from '../controllers/incidentes'

const routerIncidentes = Router()

routerIncidentes.get('/incidentes', getAll)
routerIncidentes.post('/incidente', insert)

export default routerIncidentes