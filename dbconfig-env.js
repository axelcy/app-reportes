import 'dotenv/config'

const config = {
    server      : process.env.DB_SERVER,
    database    : process.env.DB_DATABASE,
    options     : {
        trustServerCertificate  : true,
        trustedConnection       : true,
    }
}
process.env.DB_PORT ? config.port = parseInt(process.env.DB_PORT) : ""

export default config