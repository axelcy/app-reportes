import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

export const getImg = async(_req: any, _res: any) => {
    // console.log(__dirname)
    _res.sendFile(`${__dirname}/public/images/${_req.params.img}`, (err: any) => {
        err && _res.sendFile(`${__dirname}/public/error.jpg`)
    })
}