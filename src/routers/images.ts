import { Router } from 'express'
import { getImg, getIncidenteImg } from '../controllers/images'

const routerImages = Router()

routerImages.get('/img/:img', getImg)
routerImages.get('/img/incidente/:img', getIncidenteImg)
// routerImages.post('/img/:base64img', insert)

export default routerImages