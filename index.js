import AulaService from "./src/services/aula-service.js"
import EdificioService from "./src/services/edificio-service.js"
import IncidenteService from "./src/services/incidente-service.js"
import PisoService from "./src/services/piso-service.js"
import UsuarioService from "./src/services/usuario-service.js"

console.clear()

const getEdificios = async(id) => await new EdificioService().getAll()
const getUsuarios = async(id) => await new UsuarioService().getAll()
const getPisos = async(id) => await new PisoService().getAll()
const getIncidentes = async(id) => await new IncidenteService().getAll()

console.log("\n **** getEdificios **** \n" + JSON.stringify(await getEdificios()))
console.log("\n **** getUsuarios **** \n" + JSON.stringify(await getUsuarios()))
console.log("\n **** getPisos **** \n" + JSON.stringify(await getPisos()))
console.log("\n **** getIncidentes **** \n" + JSON.stringify(await getIncidentes()))


const getUsuarioById = async(id) => await new UsuarioService().getById(id)
const getEdificioById = async(id) => await new EdificioService().getById(id)
const getPisoById = async(id) => await new PisoService().getById(id)
const getIncidenteById = async(id) => await new IncidenteService().getById(id)

console.log("\n **** getUsuarioById **** \n" + JSON.stringify(await getUsuarioById(2)))
console.log("\n **** getEdificioById **** \n" + JSON.stringify(await getEdificioById(2)))
console.log("\n **** getPisoById **** \n" + JSON.stringify(await getPisoById(2)))
console.log("\n **** getIncidenteById **** \n" + JSON.stringify(await getIncidenteById(2)))


const getUsuarioByName = async(name) => await new UsuarioService().getByName(name)
console.log("\n **** getUsuarioByName **** \n" + JSON.stringify(await getUsuarioByName("x")))


const getPisosByEdificio = async(id) => await new PisoService().getByEdificio(id)
const getAulasByPiso = async(id) => await new AulaService().getByPiso(id)

console.log("\n **** getPisosByEdificio **** \n" + JSON.stringify(await getPisosByEdificio(1)))
console.log("\n **** getAulasByPiso **** \n" + JSON.stringify(await getAulasByPiso(2)))


const getIncidenteByUsuario = async(id) => await new IncidenteService().getByUsuario(id)
const getIncidenteByEdificio = async(id) => await new IncidenteService().getByEdificio(id)

console.log("\n **** getIncidenteByUsuario **** \n" + JSON.stringify(await getIncidenteByUsuario(2)))
console.log("\n **** getIncidenteByEdificio **** \n" + JSON.stringify(await getIncidenteByEdificio(1)))