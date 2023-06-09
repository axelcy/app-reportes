import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import swaggerJSdoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import activeRoutes from './routers/active-routers'
import { options } from '../swaggerOptions'

const app = express()
app.set('port', process.env.PORT || 3001)

app.use(cors()) // comunicacion entre servidores
app.use(morgan('dev')) // ver peticiones en consola
app.use(express.json()) // para recibir json

app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerJSdoc(options)))
activeRoutes.forEach(router => app.use(router))

// app.delete para borrar
// app.put para actualizar

export default app