import { Router } from 'express'
import { getByAula, getAll } from '../controllers/pisos-aulas'

const routerPisosAulas = Router()

routerPisosAulas.get('/pisosaulas', getAll)
routerPisosAulas.get('/pisosaulas/aula/:idAula', getByAula)

export default routerPisosAulas