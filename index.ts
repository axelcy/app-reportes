import express from 'express'
import cors from 'cors'
import activeRoutes from './src/routers/active-routers'

console.clear()

const app = express()
const port = 3001

app.listen(port, () => console.log(` * Example app listening on port ${port}`))

app.use(cors())
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.multipart());

app.get('/', (_req: any, _res: any) => _res.send(`Reportes api!`))
activeRoutes.forEach(router => app.use(router))

// app.delete para borrar
// app.put para actualizar