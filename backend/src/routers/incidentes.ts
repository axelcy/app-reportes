import { Router } from 'express'
import { getByPiso } from '../controllers/aulas'
import { getAll, getByUsuario, getByEstado, insert, update, getByEdificio, getByAula } from '../controllers/incidentes'

const routerIncidentes = Router()

routerIncidentes.get('/incidentes', getAll)
routerIncidentes.get('/incidentes/estado/:idEstado', getByEstado)
routerIncidentes.get('/incidentes/:idUsuario', getByUsuario)
routerIncidentes.post('/incidentes', insert)
routerIncidentes.put('/incidentes', update)

routerIncidentes.get('/incidentes/edificio/:idEdificio', getByEdificio)
routerIncidentes.get('/incidentes/piso/:idPiso', getByPiso)
routerIncidentes.get('/incidentes/aula/:idAula', getByAula)

export default routerIncidentes