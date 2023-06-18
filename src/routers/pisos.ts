import { Router } from 'express'
import { getAll, getById, getByEdificio } from '../controllers/pisos'

const routerPisos = Router()

routerPisos.get('/pisos', getAll)
routerPisos.get('/pisos/:id', getById)
routerPisos.get('/pisos/edificio/:id', getByEdificio)

export default routerPisos

