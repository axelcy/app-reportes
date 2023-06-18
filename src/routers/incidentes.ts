import { Router } from 'express'
import { getAll, insert } from '../controllers/incidentes'

const routerIncidentes = Router()

routerIncidentes.get('/incidentes', getAll)
routerIncidentes.post('/incidentes', insert)

export default routerIncidentes