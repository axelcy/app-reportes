import { Router } from 'express'
import { getAll, getById, getByPisoAula } from '../controllers/edificios'

const routerEdificios = Router()

routerEdificios.get('/edificios', getAll)
routerEdificios.get('/edificios/:id', getById)
routerEdificios.get('/edificios/pisoaula/:idPisoAula', getByPisoAula)

export default routerEdificios