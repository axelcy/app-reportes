import sql from 'mssql'
import config from '../../dbconfig-env'
import Incidente from '../models/Incidente'

type Order = 'importancia' | 'fecha' | 'edificio' | 'categoria'

class IncidenteService {
    getAll = async (order: Order = 'fecha') => {
        let query = `
        select i.id, i.nombre, i.descripcion, i.idUsuario, i.fecha, i.idUsuarioSolucion, i.estado, i.foto, c.descripcion 'categoria', n.descripcion 'imporancia', e.descripcion 'edificio' from Incidentes i
		inner join Categorias c on c.id = i.categoria
        inner join Niveles_Importancia n on n.id = i.importancia
        inner join Pisos_Aulas pa on pa.id = i.idPisoAula
        inner join Edificios_Pisos ep on ep.id = pa.idEdificioPiso
        inner join Edificios e on e.id = ep.idEdificio
        `
        switch (order) {
            case 'importancia':
                query += " order by i.importancia desc"
                break
            case 'fecha':
                query += " order by i.fecha desc"
                break
            case 'edificio':
                query += " order by ep.idEdificio asc"
                break
            case 'categoria':
                query += " order by c.id asc"
                break
        }
        let returnArray = null
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
    getById = async(id: number) => {
        let returnArray = null
        let query = `
        select * from Incidentes
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
    getByEstado = async(idEstado: number) => {
        let returnArray = null
        let query = `
        select * from Incidentes
        where estado = @IdEstado`
        try {
            const pool = await sql.connect(config)
            const result = await pool.request().input('IdEstado', sql.Int, idEstado).query(query)
            returnArray = result.recordsets[0]
        }
        catch (error) {
            console.log(error)
        }
        return returnArray
    }
    getByEdificio = async(idEdificio: number) => {
        let returnArray = null
        let query = `
        select i.id, i.nombre, i.descripcion, i.fecha, i.importancia from Incidentes i
        inner join Pisos_Aulas pa on pa.id = i.idPisoAula
        inner join Edificios_Pisos ep on ep.id = pa.idEdificioPiso
        inner join Edificios e on e.id = ep.idEdificio
        where e.id = @Id`
        try {
            const pool = await sql.connect(config)
            const result = await pool.request().input('Id', sql.Int, idEdificio).query(query)
            returnArray = result.recordsets[0]
        }
        catch (error) {
            console.log(error)
        }
        return returnArray
    }
    getByPiso = async(idPiso: number) => {
        let returnArray = null
        let query = `
        select i.id, i.nombre, i.descripcion, i.fecha, i.importancia from Incidentes i
        inner join Pisos_Aulas pa on pa.id = i.idPisoAula
        inner join Edificios_Pisos ep on ep.id = pa.idEdificioPiso
        inner join Pisos p on p.id = ep.idPiso
        where p.id = @Id`
        try {
            const pool = await sql.connect(config)
            const result = await pool.request().input('Id', sql.Int, idPiso).query(query)
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
        select i.id, i.nombre, i.descripcion, i.fecha, i.importancia from Incidentes i
        inner join Pisos_Aulas pa on pa.id = i.idPisoAula
        inner join Aulas a on a.id = pa.idAula
        where a.id = @Id`
        try {
            const pool = await sql.connect(config)
            const result = await pool.request().input('Id', sql.Int, idAula).query(query)
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
        where idUsuario = @IdUsuario`
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
    insert = async (incidente: Incidente) => {
        let returnData = null
        try {
            let pool = await sql.connect(config);
            await pool.request()
            .input('Nombre',            sql.NChar, incidente.nombre)
            .input('Descripcion',       sql.NChar, incidente.descripcion)
            .input('IdUsuario',         sql.Int, incidente.idUsuario)
            .input('IdPisoAula',        sql.Int, incidente.idPisoAula)
            .input('Fecha',             sql.Date, incidente.fecha)
            .input('Importancia',       sql.Int, incidente.importancia)
            .input('Estado',            sql.Int, incidente.estado)
            .input('IdUsuarioSolucion', sql.Int, incidente.idUsuarioSolucion)
            .input('Categoria',         sql.Int, incidente.categoria)
            .input('Foto',              sql.NChar, incidente.foto)
            .query(`INSERT INTO Incidentes (nombre, descripcion, idUsuario, idPisoAula, fecha, importancia, estado, idUsuarioSolucion, categoria, foto) 
            VALUES (@Nombre, @Descripcion, @IdUsuario, @IdPisoAula, @Fecha, @Importancia, @Estado, @IdUsuarioSolucion, @Categoria, @Foto)`);
            
            const selectQuery = `
            SELECT TOP 1 * FROM Incidentes
            where idUsuario = ${incidente.idUsuario}
            order by id desc`
            returnData = await sql.query(selectQuery)

        } catch (error) {
            console.log(error);
            throw new Error("No se pudo hacer el INSERT de INCIDENTE")
        }
        return returnData.recordset[0]
    }
    update = async (incidente: Incidente) => {
        let returnData = null
        try {
            let pool = await sql.connect(config);
            await pool.request()
            .input('Nombre',            sql.NChar, incidente.nombre)
            .input('Descripcion',       sql.NChar, incidente.descripcion)
            .input('IdUsuario',         sql.Int, incidente.idUsuario)
            .input('IdPisoAula',        sql.Int, incidente.idPisoAula)
            .input('Fecha',             sql.Date, incidente.fecha)
            .input('Importancia',       sql.Int, incidente.importancia)
            .input('Estado',            sql.Int, incidente.estado)
            .input('IdUsuarioSolucion', sql.Int, incidente.idUsuarioSolucion)
            .input('Categoria',         sql.Int, incidente.categoria)
            .input('Foto',              sql.NChar, incidente.foto)
            .query(`UPDATE Incidentes 
            SET Nombre = @Nombre,
            Descripcion = @Descripcion,
            IdUsuario = @IdUsuario,
            IdPisoAula = @IdPisoAula,
            Fecha = @Fecha,
            Importancia = @Importancia,
            Estado = @Estado,
            IdUsuarioSolucion = @IdUsuarioSolucion,
            Categoria = @Categoria,
            Foto = @Foto
            WHERE id = ${incidente.id}`)

            const selectQuery = `
            SELECT TOP 1 * FROM Incidentes
            where id = ${incidente.id}`
            returnData = await sql.query(selectQuery)

        } catch (error) {
            console.log(error);
            throw new Error("No se pudo hacer el UPDATE de INCIDENTE")
        }
        return returnData.recordset[0]
    }
    deleteById = async(id: number) => {
        let returnArray = null
        let query = `
        DELETE FROM Incidentes
        WHERE id = @Id`
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

export default IncidenteService