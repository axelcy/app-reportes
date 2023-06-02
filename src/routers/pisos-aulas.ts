import { Router } from 'express'
import { getByAula, getAll } from '../controllers/pisos-aulas'

const routerPisosAulas = Router()

routerPisosAulas.get('/pisosaulas', getAll)
routerPisosAulas.get('/pisoaula/aula/:id', getByAula)

export default routerPisosAulas