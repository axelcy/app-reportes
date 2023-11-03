import { Router } from 'express'
import { getAll, getById } from '../controllers/categoria'

const routerCategorias = Router()

routerCategorias.get('/categorias', getAll)
routerCategorias.get('/categorias/:id', getById)

export default routerCategorias

