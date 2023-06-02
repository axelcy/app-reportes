export const getImg = async(_req: any, _res: any) => {
    _res.sendFile(`${__dirname}/public/imgages/${_req.params.img}`, (err: any) => {
        err && _res.sendFile(`${__dirname}/public/error.jpg`)
    })
}