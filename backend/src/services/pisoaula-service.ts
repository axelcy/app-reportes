import sql from 'mssql'
import config from '../../dbconfig-env'

class PisoAulaService {
    getAll = async () => {
        let returnArray = null
        try {
            const pool = await sql.connect(config)
            const result = await pool.request().query("SELECT * from Pisos_Aulas")
            returnArray = result.recordsets[0]
        }
        catch (error) {
            console.log(error)
        }
        return returnArray
    }
    getByAula = async(idAula: number) => {
        let returnArray = null
        let query = `
        select * from Pisos_Aulas
        where idAula = @IdAula`
        try {
            const pool = await sql.connect(config)
            const result = await pool.request().input('IdAula', sql.Int, idAula).query(query)
            returnArray = result.recordsets[0][0]
        }
        catch (error) {
            console.log(error)
        }
        return returnArray
    }
}

export default PisoAulaService

