import { Router } from 'express'
import { getAll, getById } from '../controllers/usuarios'

const routerUsuarios = Router()

routerUsuarios.get('/usuarios', getAll)
routerUsuarios.get('/usuario/:id', getById)

export default routerUsuarios