import AulaService from "./aula-service"
import EdificioService from "./edificio-service"
import IncidenteService from "./incidente-service"
import PisoService from "./piso-service"
import UsuarioService from "./usuario-service"
import PisoAulaService from "./pisoaula-service"

import Incidente from '../models/Incidente'

type Order = 'importancia' | 'fecha' | 'edificio' | 'categoria'

class DbService {
    getEdificios = async() => await new EdificioService().getAll()
    getUsuarios = async() => await new UsuarioService().getAll()
    getPisos = async() => await new PisoService().getAll()
    getIncidentes = async(order: Order = 'fecha') => await new IncidenteService().getAll(order)
    getAulas = async() => await new AulaService().getAll()

    getUsuarioById = async(id: number) => await new UsuarioService().getById(id)
    getEdificioById = async(id: number) => await new EdificioService().getById(id)
    getPisoById = async(id: number) => await new PisoService().getById(id)
    getIncidenteById = async(id: number) => await new IncidenteService().getById(id)
    getAulaById = async(id: number) => await new AulaService().getById(id)

    getUsuarioByName = async(name: string) => await new UsuarioService().getByName(name)

    getPisosByEdificio = async(id: number) => await new PisoService().getByEdificio(id)
    getAulasByPiso = async(id: number) => await new AulaService().getByPiso(id)

    getPisoAulaByAula = async(idAula: number) => await new PisoAulaService().getByAula(idAula)

    getIncidenteByUsuario = async(id: number) => await new IncidenteService().getByUsuario(id)
    getIncidenteByEdificio = async(id: number) => await new IncidenteService().getByEdificio(id)

    // INSERT

    insertIncidente = async(incidente: Incidente) => await new IncidenteService().insert(incidente)

}

export default DbService