import DbService from "./src/services/db-service.ts"
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
})

console.clear()

// Set up server
app.use(cors())
app.listen(port, () => console.log(` * Example app listening on port ${port}`))
app.get('/', (_req: any, _res: any) => _res.send(`Reportes api!`))

// Routes
app.get(routes.edificios, async(_req: any, _res: any) => _res.send(await dbService.getEdificios()))

// Images
app.get(`${routes.img}/:img`, async(_req: any, _res: any) => {
    _res.sendFile(`${__dirname}/src/img/${_req.params.img}`, (err: any) => {
        err && _res.sendFile(`${__dirname}/src/img/error.jpg`)
    })
})