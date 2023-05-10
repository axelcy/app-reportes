import AulaService from "./src/services/aula-service.js"
import EdificioService from "./src/services/edificio-service.js"
import PisoService from "./src/services/piso-service.js"
import UsuarioService from "./src/services/usuario-service.js"

const getEdificios = async() => JSON.stringify(await new EdificioService().getAll())
const getPisosByEdificio = async(id) => JSON.stringify(await new PisoService().getByEdificio(id))
const getAulasByPiso = async(id) => JSON.stringify(await new AulaService().getByPiso(id))
const getUsuarioById = async(id) => JSON.stringify(await new UsuarioService().getById(id))

console.clear()
console.log("\n **** getEdificios **** \n" + await getEdificios())
console.log("\n **** getPisosByEdificio **** \n" + await getPisosByEdificio(1))
console.log("\n **** getAulasByPiso **** \n" + await getAulasByPiso(2))
console.log("\n **** getUsuarioById **** \n" + await getUsuarioById(2))