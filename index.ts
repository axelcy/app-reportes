import express from 'express'
import cors from 'cors'
import activeRoutes from './src/routers/active-routers'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename) // \app-reportes


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