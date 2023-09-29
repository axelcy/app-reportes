import { fileURLToPath } from 'url'
import { dirname } from 'path'
import app from './src/app'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename) // \app-reportes

console.clear()
app.listen(app.get('port'), () => console.log(` * Example app listening on port ${app.get('port')}!`))

// import crypto from 'crypto'
// type userId = `${string}-${string}-${string}-${string}-${string}`
// readonly id: userId = crypto.randomUUID()

// .delete, .put (actualizar obj entero), .patch (actualizar parcialmente)