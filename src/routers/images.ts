import { Router } from 'express'
import { getImg } from '../controllers/images'

const routerIncidentes = Router()

routerIncidentes.get('/img/:id', getImg)

export default routerIncidentes