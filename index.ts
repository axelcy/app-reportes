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
    edificios: '/edificios',
    pisos: '/pisos',
    aulas: '/aulas',
    usuarios: '/usuarios',
    incidentes: '/incidentes'
})

console.clear()

// Set up server
app.use(cors())
app.listen(port, () => console.log(` * Example app listening on port ${port}`))
app.get('/', (_req: any, _res: any) => _res.send(`Reportes api!`))

// Routes
app.get(routes.edificios, async(_req: any, _res: any) => _res.send(await dbService.getEdificios()))
app.get(`${routes.edificios}/:id`, async(_req: any, _res: any) => {
    _res.send(await dbService.getEdificioById(Number(_req.params.id)))
})

app.get(routes.pisos, async(_req: any, _res: any) => _res.send(await dbService.getPisos()))
app.get(`${routes.pisos}/:id`, async(_req: any, _res: any) => {
    _res.send(await dbService.getPisoById(Number(_req.params.id)))
})
app.get(`${routes.pisos}/edificio/:id`, async(_req: any, _res: any) => {
    _res.send(await dbService.getPisosByEdificio(Number(_req.params.id)))
})

app.get(routes.aulas, async(_req: any, _res: any) => _res.send(await dbService.getAulas()))
app.get(`${routes.aulas}/:id`, async(_req: any, _res: any) => {
    _res.send(await dbService.getAulaById(Number(_req.params.id)))
})
app.get(`${routes.aulas}/piso/:id`, async(_req: any, _res: any) => {
    _res.send(await dbService.getAulasByPiso(Number(_req.params.id)))
})

app.get(routes.usuarios, async(_req: any, _res: any) => _res.send(await dbService.getUsuarios()))
app.get(routes.incidentes, async(_req: any, _res: any) => _res.send(await dbService.getIncidentes('importancia')))

// Images
app.get(`${routes.img}/:img`, async(_req: any, _res: any) => {
    _res.sendFile(`${__dirname}/public/img/${_req.params.img}`, (err: any) => {
        err && _res.sendFile(`${__dirname}/public/img/error.jpg`)
    })
})