import sql from 'mssql'
import config from '../../dbconfig-env'

class AulaService {
    getAll = async () => {
        let returnArray = null
        try {
            const pool = await sql.connect(config)
            const result = await pool.request().query("SELECT * from Aulas")
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
        select * from Aulas
        where Id = @Id`
        try {
            const pool = await sql.connect(config)
            const result = await pool.request().input('Id', sql.Int, id).query(query)
            returnArray = result.recordsets[0]
        }
        catch (error) {
            console.log(error)
        }
        return returnArray
    }
    getByPiso = async(id: number) => {
        let returnArray = null
        let query = `
        select a.* from Aulas a
        inner join Pisos_Aulas pa on pa.Id_Aula = a.Id
        inner join Edificios_Pisos ep on ep.Id = pa.Id_Edificio_Piso
        inner join Pisos p on p.Id = ep.Id_Piso
        where p.Id = @Id`
        try {
            const pool = await sql.connect(config)
            const result = await pool.request().input('Id', sql.Int, id).query(query)
            returnArray = result.recordsets[0]
        }
        catch (error) {
            console.log(error)
        }
        return returnArray
    }
}

export default AulaService

