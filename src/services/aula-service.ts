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
    getByPiso = async(id: number) => {
        let returnArray = null
        let query = `
        select a.* from Aulas a
        inner join Pisos_Aulas pa on pa.idAula = a.id
        inner join Edificios_Pisos ep on ep.id = pa.idEdificioPiso
        inner join Pisos p on p.id = ep.idPiso
        where p.id = @Id`
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
    getByPisoAula = async(id: number) => {
        let returnArray = null
        let query = `
        select a.* from aulas a
        inner join Pisos_Aulas pa on pa.idAula = a.id
        where pa.id = @Id`
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
}

export default AulaService

