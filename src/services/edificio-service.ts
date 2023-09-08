import sql from 'mssql'
import config from '../../dbconfig-env'

class EdificioService {
    getAll = async () => {
        let returnArray = null
        try {
            const pool = await sql.connect(config)
            const result = await pool.request().query("SELECT * from Edificios")
            returnArray = result.recordsets[0]
        }
        catch (error) {
            console.log(error)
        }
        return returnArray
    }
    getById = async(id: number) => {
        let returnArray = null
        let query = `
        select * from Edificios
        where id = @Id`
        try {
            const pool = await sql.connect(config)
            const result = await pool.request().input('Id', sql.Int, id).query(query)
            returnArray = result.recordsets[0][0]
        }
        catch (error) {
            console.log(error)
        }
        return returnArray
    }
    getByPisoAula = async(idPisoAula: number) => {
        let returnArray = null
        let query = `
        select * from Pisos_Aulas pa
        inner join Edificios_Pisos ep on ep.id = pa.idEdificioPiso
        inner join Edificios e on e.id = ep.idEdificio
        where pa.id = @Id`
        try {
            const pool = await sql.connect(config)
            const result = await pool.request().input('Id', sql.Int, idPisoAula).query(query)
            returnArray = result.recordsets[0][0]
        }
        catch (error) {
            console.log(error)
        }
        return returnArray
    }
}

export default EdificioService