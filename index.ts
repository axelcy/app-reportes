import DbService from "./src/services/db-service"
import express from 'express'
import cors from 'cors'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
const app = express()
const port = 3001
const dbService: DbService = new DbService()
const routes = Object.freeze({
    img: '/img',
    post: '/post',

    getEdificios: '/edificios',
    getEdificioById: '/edificio',

    getPisos: '/pisos',
    getPisoById: '/piso',
    getPisosByEdificio: '/pisos/edificio',

    getAulas: '/aulas',
    getAulaById: '/aula',
    getAulasByPiso: '/aulas/piso',

    getUsuarios: '/usuarios',
    getUsuarioById: '/usuario',

    getIncidentes: '/incidentes',
    getIncidenteById: '/incidente',

    getPisoAulaByAula: '/pisoaula/aula'
})

console.clear()

// Set up server
app.use(cors())
app.listen(port, () => console.log(` * Example app listening on port ${port}`))
app.get('/', (_req: any, _res: any) => _res.send(`Reportes api!`))

app.use(express.json());
app.use(express.urlencoded());
// app.use(express.multipart());

// Routes

// EDIFICIOS

app.get(routes.getEdificios, async(_req: any, _res: any) => _res.send(await dbService.getEdificios()))
app.get(`${routes.getEdificioById}/:id`, async(_req: any, _res: any) => {
    _res.send(await dbService.getEdificioById(Number(_req.params.id)))
})

// PISOS

app.get(routes.getPisos, async(_req: any, _res: any) => _res.send(await dbService.getPisos()))
app.get(`${routes.getPisoById}/:id`, async(_req: any, _res: any) => {
    _res.send(await dbService.getPisoById(Number(_req.params.id)))
})
app.get(`${routes.getPisosByEdificio}/:id`, async(_req: any, _res: any) => {
    _res.send(await dbService.getPisosByEdificio(Number(_req.params.id)))
})

// AULAS

app.get(routes.getAulas, async(_req: any, _res: any) => _res.send(await dbService.getAulas()))
app.get(`${routes.getAulaById}/:id`, async(_req: any, _res: any) => {
    _res.send(await dbService.getAulaById(Number(_req.params.id)))
})
app.get(`${routes.getAulasByPiso}/:id`, async(_req: any, _res: any) => {
    _res.send(await dbService.getAulasByPiso(Number(_req.params.id)))
})

// PISO AULA
app.get(`${routes.getPisoAulaByAula}/:idAula`, async(_req: any, _res: any) => {
    _res.send(await dbService.getPisoAulaByAula(Number(_req.params.idAula)))
})

// USUARIOS
app.get(routes.getUsuarios, async(_req: any, _res: any) => _res.send(await dbService.getUsuarios()))

// INCIDENTES
app.get(routes.getIncidentes, async(_req: any, _res: any) => _res.send(await dbService.getIncidentes('importancia')))




// Images
app.get(`${routes.img}/:img`, async(_req: any, _res: any) => {
    _res.sendFile(`${__dirname}/public/img/${_req.params.img}`, (err: any) => {
        err && _res.sendFile(`${__dirname}/public/img/error.jpg`)
    })
})


// ---------------------------------------POST WAZA---------------------------------------
import Incidente from './src/models/Incidente'

// var urlencodedParser = bodyParser.urlencoded({ extended: false })  
// app.post('/process_post', urlencodedParser, function (req, res) {  
//     // Prepare output in JSON format  
//     response = {  
//         first_name:req.body.first_name,  
//         last_name:req.body.last_name  
//     };  
//     console.log(response);  
//     res.end(JSON.stringify(response));  
//  })  

app.use(bodyParser.json()) // to support JSON-encoded bodies
// app.use(bodyParser.urlencoded({ extended: true })) // to support URL-encoded bodies 
app.use(express.urlencoded({ extended: true }))  
// assuming POST: name=foo&color=red            <-- URL encoding
//
// or       POST: {"name":"foo","color":"red"}  <-- JSON encoding

app.post(routes.post + routes.getIncidenteById, async(_req: any, _res: any) => {
    const incidente: Incidente = _req.body
    console.log(incidente)
    const results = await dbService.insertIncidente(incidente)
    _res.end(JSON.stringify(results))
});