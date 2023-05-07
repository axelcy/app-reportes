import sql from 'mssql'
import config from '../../dbconfig-env.js'

class AulaService {
    getAll = async () => {
        let returnArray = null
        try {
            let pool = await sql.connect(config)
            let result = await pool.request().query("SELECT * from Aulas")
            returnArray = result.recordsets[0]
        }
        catch (error) {
            console.log(error)
        }
        return returnArray
    }
}

export default AulaService

