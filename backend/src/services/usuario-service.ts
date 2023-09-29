import sql from 'mssql'
import config from '../../dbconfig-env'
import Usuario from '../models/Usuario'

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
        where email = '${email}'`
        try {
            const pool = await sql.connect(config)
            const result = await pool.request().query(query)
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
    insert = async (usuario: Usuario) => {
        let returnData = null
        try {
            let pool = await sql.connect(config);
            await pool.request()
            .input('Nombre', sql.NChar, usuario.nombre)
            .input('Apellido', sql.NChar, usuario.apellido)
            .input('Email', sql.NChar, usuario.email)
            .input('Foto', sql.NChar, usuario.foto)
            .input('EsSupervisor', sql.Bit, usuario.esSupervisor)
            .query(`INSERT INTO Usuarios (nombre, apellido, email, foto, esSupervisor) 
            VALUES (@Nombre, @Apellido, @Email, @Foto, @EsSupervisor)`);

            // const selectQuery = `
            // SELECT TOP 1 * FROM Usuarios
            // where email = '${usuario.email}'`
            // returnData = await sql.query(selectQuery)
            // console.log(returnData)
            returnData = this.getByEmail(usuario.email)

        } catch (error) {
            console.log(error)
            throw new Error("No se pudo hacer el INSERT de USUARIO")
        }
        return returnData
    }
    update = async (usuario: Usuario) => {
        let returnData = null
        try {
            let pool = await sql.connect(config);
            await pool.request()

            .input('Nombre', sql.NChar, usuario.nombre)
            .input('Apellido', sql.NChar, usuario.apellido)
            .input('Email', sql.NChar, usuario.email)
            .input('Foto', sql.NChar, usuario.foto)
            .input('EsSupervisor', sql.Bit, usuario.esSupervisor)
            .query(`UPDATE Usuarios SET
            Nombre = @Nombre,
            Apellido = @Apellido,
            Email = @Email,
            Foto = @Foto,
            EsSupervisor = @EsSupervisor
            WHERE id = ${usuario.id}`)
            const selectQuery = `
            SELECT TOP 1 * FROM Usuarios
            where id = ${usuario.id}`
            returnData = await sql.query(selectQuery)

        } catch (error) {
            console.log(error);
            throw new Error("No se pudo hacer el UPDATE de USUARIO")
        }
        return returnData.recordset[0]
    }
}

export default UsuarioService