import { Router } from 'express'
import { getAll, getById, getByPiso } from '../controllers/aulas'

const routerAulas = Router()

routerAulas.get('/aulas', getAll)
routerAulas.get('/aula/:id', getById)
routerAulas.get('/aulas/piso/:id', getByPiso)

export default routerAulas

