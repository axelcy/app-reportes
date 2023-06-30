import 'dotenv/config'

const localhostConfig = {
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

const onlineConfig = {
    user        : process.env.ONLINE_DB_USER,
    password    : process.env.ONLINE_DB_PASSWORD,
    server      : process.env.ONLINE_DB_SERVER,
    database    : process.env.ONLINE_DB_DATABASE,
    options     : {
        trustServerCertificate  : true,
        trustedConnection       : true,
    }
}

var config = localhostConfig
if (process.env.USE_ONLINE_DB === 'true') config = onlineConfig

export default config