import { Router } from 'express'
import { getAll, insert } from '../controllers/incidentes'

const routerEdificios = Router()

routerEdificios.get('/incidentes', getAll)
routerEdificios.post('/incidentes', insert)

export default routerEdificios