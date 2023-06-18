import { Router } from 'express'
import { getAll, getById, getByEmail } from '../controllers/usuarios'

const routerUsuarios = Router()

routerUsuarios.get('/usuarios', getAll)
routerUsuarios.get('/usuarios/:id', getById)
routerUsuarios.get('/usuarios/email/:email', getByEmail)

export default routerUsuarios