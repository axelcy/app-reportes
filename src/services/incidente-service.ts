import sql from 'mssql'
import config from '../../dbconfig-env.ts'

class IncidenteService {
    getAll = async () => {
        let returnArray = null
        try {
            const pool = await sql.connect(config)
            const result = await pool.request().query("SELECT * from Incidentes")
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
        select * from Incidentes
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
    getByEdificio = async(id: number) => {
        let returnArray = null
        let query = `
        select i.id, i.Descripcion, i.Fecha, i.Nivel from Incidentes i
        inner join Pisos_Aulas pa on pa.Id = i.Id_Piso_Aula
        inner join Edificios_Pisos ep on ep.Id = pa.Id_Edificio_Piso
        inner join Edificios e on e.Id = ep.Id_Edificio
        where e.Id = @Id`
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
    getByUsuario = async(id: number) => {
        let returnArray = null
        let query = `
        select * from Incidentes
        where Id_Usuario = @IdUsuario`
        try {
            const pool = await sql.connect(config)
            const result = await pool.request().input('IdUsuario', sql.Int, id).query(query)
            returnArray = result.recordsets[0]
        }
        catch (error) {
            console.log(error)
        }
        return returnArray
    }
}

export default IncidenteService