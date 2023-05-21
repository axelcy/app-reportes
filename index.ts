import DbService from "./src/services/db-service"
import express from 'express'
import cors from 'cors'
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
const app = express()
const port = 3001
const dbService: DbService = new DbService()
const routes = Object.freeze({
    img: '/img',
    getEdificios: '/edificios',
    getPisos: '/pisos',
    getAulas: '/aulas',
    getUsuarios: '/usuarios',
    getIncidentes: '/incidentes',
    
    getEdificioById: '/edificio',
    getPisoById: '/piso',
    getAulaById: '/aula',
    getUsuarioById: '/usuario',
    getIncidenteById: '/incidente'
})

console.clear()

// Set up server
app.use(cors())
app.listen(port, () => console.log(` * Example app listening on port ${port}`))
app.get('/', (_req: any, _res: any) => _res.send(`Reportes api!`))

// Routes
app.get(routes.getEdificios, async(_req: any, _res: any) => _res.send(await dbService.getEdificios()))
app.get(`${routes.getEdificios}/:id`, async(_req: any, _res: any) => {
    _res.send(await dbService.getEdificioById(Number(_req.params.id)))
})

app.get(routes.getPisos, async(_req: any, _res: any) => _res.send(await dbService.getPisos()))
app.get(`${routes.getPisos}/:id`, async(_req: any, _res: any) => {
    _res.send(await dbService.getPisoById(Number(_req.params.id)))
})
app.get(`${routes.getPisos}/edificio/:id`, async(_req: any, _res: any) => {
    _res.send(await dbService.getPisosByEdificio(Number(_req.params.id)))
})

app.get(routes.getAulas, async(_req: any, _res: any) => _res.send(await dbService.getAulas()))
app.get(`${routes.getAulas}/:id`, async(_req: any, _res: any) => {
    _res.send(await dbService.getAulaById(Number(_req.params.id)))
})
app.get(`${routes.getAulas}/piso/:id`, async(_req: any, _res: any) => {
    _res.send(await dbService.getAulasByPiso(Number(_req.params.id)))
})

app.get(routes.getUsuarios, async(_req: any, _res: any) => _res.send(await dbService.getUsuarios()))
app.get(routes.getIncidentes, async(_req: any, _res: any) => _res.send(await dbService.getIncidentes('importancia')))

// Images
app.get(`${routes.img}/:img`, async(_req: any, _res: any) => {
    _res.sendFile(`${__dirname}/public/img/${_req.params.img}`, (err: any) => {
        err && _res.sendFile(`${__dirname}/public/img/error.jpg`)
    })
})