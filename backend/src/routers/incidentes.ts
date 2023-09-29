import { Router } from 'express'
import { getAll, getByUsuario, getByEstado, insert, update, getByEdificio, getByAula, deleteById, getByPiso } from '../controllers/incidentes'

const routerIncidentes = Router()

routerIncidentes.get('/incidentes', getAll)
routerIncidentes.get('/incidentes/estado/:idEstado', getByEstado)
routerIncidentes.get('/incidentes/:idUsuario', getByUsuario)
routerIncidentes.post('/incidentes', insert)
routerIncidentes.put('/incidentes', update)

routerIncidentes.get('/incidentes/edificio/:idEdificio', getByEdificio)
routerIncidentes.get('/incidentes/piso/:idPiso', getByPiso)
routerIncidentes.get('/incidentes/aula/:idAula', getByAula)

routerIncidentes.delete('/incidentes/:id', deleteById)

export default routerIncidentes