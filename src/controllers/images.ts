import { __dirname } from "../../index"

export const getImg = async(_req: any, _res: any) => {
    console.log(__dirname)
    _res.sendFile(`${__dirname}/public/images/${_req.params.img}`, (err: any) => {
        err && _res.sendFile(`${__dirname}/public/error.jpg`)
    })
}

export const getIncidenteImg = async(_req: any, _res: any) => {
    console.log(__dirname)
    _res.sendFile(`${__dirname}/public/images/incidentes/${_req.params.img}`, (err: any) => {
        err && _res.sendFile(`${__dirname}/public/error.jpg`)
    })
}

// export const insert = async(_req: any, _res: any) => {
//     const isSaved = saveFileContentBase64Img("id.webp", _req.body.base64img)
//     if (isSaved) _res.end(`imagen guardada como ${"id.webp"}`)
//     else _res.end("error al guardar la imagen")
// }