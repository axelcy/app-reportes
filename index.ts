import DbService from "./src/services/db-service.ts"
import express from 'express'

console.clear()

const app = express()
const port = 3001
const dbService: DbService = new DbService()
const routes = Object.freeze({
    edificios: '/edificios',
    pisos: '/pisos',
    aulas: '/aulas',
    usuarios: '/usuarios',
})

app.listen(port, () => console.log(` * Example app listening on port ${port}`))
app.get('/', (_req: any, res: any) => res.send(`Reportes api!`))

app.get(routes.edificios, async(_req: any, res: any) => res.send(await dbService.getEdificios()))
