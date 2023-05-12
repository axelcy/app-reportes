import 'dotenv/config'

const config = {
    user        : process.env.DB_USER,
    password    : process.env.DB_PASSWORD,
    server      : process.env.DB_SERVER,
    database    : process.env.DB_DATABASE,
    options     : {
        trustServerCertificate  : true,
        trustedConnection       : true,
    }
}

// process.env.DB_PORT ? config.port = parseInt(process.env.DB_PORT) : ""

export default config