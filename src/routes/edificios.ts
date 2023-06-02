import { Router } from 'express'
import { getAll, getById } from '../controllers/edificios'

const routerEdificios = Router()

routerEdificios.get('/edificios', getAll)
routerEdificios.get('/edificio/:id', getById)

export default routerEdificios