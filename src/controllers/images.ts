import { __dirname } from "../../index"
import fs from "fs"

export const get = async(_req: any, _res: any) => {
    console.log(__dirname)
    _res.sendFile(`${__dirname}/public/images/${_req.params.img}`, (err: any) => {
        err && _res.sendFile(`${__dirname}/public/error.jpg`)
    })
}

export const insert = async(_req: any, _res: any) => {
    const isSaved = saveFileContentBase64Img("id.webp", _req.body.base64img)
    if (isSaved) _res.end(`imagen guardada como ${"id.webp"}`)
    else _res.end("error al guardar la imagen")
}

function saveFileContentBase64Img(fileName: string, srcBase64: string) {
    try {
        var cabecera = srcBase64.substring(0, 50)
    } catch {
        return false
    }
    // data:image/webp;base64,/
    if (cabecera.startsWith("data:")) {
        let posComa = cabecera.indexOf(",")
        srcBase64 = srcBase64.substring(posComa + 1)
    }
    try {
        fs.writeFileSync(fileName, srcBase64, 'base64')
    } catch {
        return false
    }
    return true
}