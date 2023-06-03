import { Router } from 'express'
import { getImg } from '../controllers/images'

const routerIncidentes = Router()

routerIncidentes.get('/img/:img', getImg)

export default routerIncidentes