import routerAulas from "./aulas"
import routerEdificios from "./edificios"
import routerIncidentes from "./incidentes"
import routerPisos from "./pisos"
import routerPisosAulas from "./pisos-aulas"
import routerUsuarios from "./usuarios"
import routerImages from "./images"

/**
 * @swagger
 * /Test:
 *  get:
 *  summary: Test get
*/

/**
 * @swagger
 * tags:
 * - name: Aulas
 *   description: Aulas endpoints
*/

/**
 * @swagger
 * /aulas:
 *  get:
 *  summary: Get all aulas 
 *  tag: [Aulas]
*/
export default [
    routerImages,
    routerAulas,
    routerEdificios,
    routerIncidentes,
    routerPisos,
    routerPisosAulas,
    routerUsuarios
]