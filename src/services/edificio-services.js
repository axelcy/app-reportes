import sql from 'mssql'
import config from '../../dbconfig-env.js'

class EdificioService {
    getAll = async () => {
        let returnArray = null
        console.log(config)
        try {
            // User Id=username;Password=password;
            // 'Server=localhost,1433;Database=app-personajes;Encrypt=true;Trusted_Connection=true'
            const pool = await sql.connect(config)
            // console.log(pool)
            const result = await pool.request().query("SELECT * from Edificios")
            // console.log(result)
            returnArray = result.recordsets[0]
        }
        catch (error) {
            console.log(error)
        }
        return returnArray
    }
}

export default EdificioService