import { Router } from 'express'
import { getAll, getById, getByEmail, insert, update } from '../controllers/usuarios'

const routerUsuarios = Router()

routerUsuarios.get('/usuarios', getAll)
routerUsuarios.get('/usuarios/:id', getById)
routerUsuarios.get('/usuarios/email/:email', getByEmail)
routerUsuarios.post('/usuarios', insert)
routerUsuarios.put('/usuarios', update)

export default routerUsuarios