import { Router } from 'express'
import { getAll, getById, getByPiso, getByPisoAula } from '../controllers/aulas'

const routerAulas = Router()

routerAulas.get('/aulas', getAll)
routerAulas.get('/aulas/:id', getById)
routerAulas.get('/aulas/piso/:id', getByPiso)
routerAulas.get('/aula/pisoaula/:idPisoAula', getByPisoAula)

export default routerAulas

