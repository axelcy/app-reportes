import { Router } from 'express'
import { get, insert } from '../controllers/images'

const routerImages = Router()

routerImages.get('/img/:img', get)
routerImages.post('/img/:base64img', insert)

export default routerImages