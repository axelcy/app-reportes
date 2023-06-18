import sql from 'mssql'
import config from '../../dbconfig-env'

class UsuarioService {
    getAll = async () => {
        let returnArray = null
        try {
            const pool = await sql.connect(config)
            const result = await pool.request().query("SELECT * from Usuarios")
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
        select * from Usuarios
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
    getByEmail = async(email: string) => {
        let returnArray = null
        let query = `
        select * from Usuarios
        where email = @Email`
        try {
            const pool = await sql.connect(config)
            const result = await pool.request().query(query).input('Email', sql.VarChar, email).query(query)
            returnArray = result.recordsets[0][0]
        }
        catch (error) {
            console.log(error)
        }
        return returnArray
    }
    getByName = async(name: string) => {
        // todos los que coincidan con el name
        let returnArray = null
        let query = `
        select * from Usuarios
        where nombre like '%${name}%'`
        try {
            const pool = await sql.connect(config)
            const result = await pool.request().query(query)
            returnArray = result.recordsets[0]
        }
        catch (error) {
            console.log(error)
        }
        return returnArray
    }
}

export default UsuarioService