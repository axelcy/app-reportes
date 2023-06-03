import { __dirname } from "../../index"

export const getImg = async(_req: any, _res: any) => {
    console.log(__dirname)
    _res.sendFile(`${__dirname}/public/images/${_req.params.img}`, (err: any) => {
        err && _res.sendFile(`${__dirname}/public/error.jpg`)
    })
}