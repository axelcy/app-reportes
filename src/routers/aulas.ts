import { Router } from 'express'
import { getAll, getById, getByPiso } from '../controllers/aulas'

const routerAulas = Router()

routerAulas.get('/aulas', getAll)
routerAulas.get('/aulas/:id', getById)
routerAulas.get('/aulas/piso/:id', getByPiso)

export default routerAulas

