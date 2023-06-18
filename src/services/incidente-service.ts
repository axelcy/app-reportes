import sql from 'mssql'
import config from '../../dbconfig-env'
import Incidente from '../models/Incidente'

type Order = 'importancia' | 'fecha' | 'edificio' | 'categoria'

class IncidenteService {
    getAll = async (order: Order = 'fecha') => {
        let query = `
        select i.id, i.nombre, i.descripcion, i.idUsuario, i.fecha, i.idUsuarioSolucion, i.estado, c.descripcion 'categoria', n.descripcion 'imporancia', e.descripcion 'edificio' from Incidentes i
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
                query += " order by i.fecha asc"
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
    getByEdificio = async(id: number) => {
        let returnArray = null
        let query = `
        select i.id, i.nombre, i.descripcion, i.fecha, i.nivel from Incidentes i
        inner join Pisos_Aulas pa on pa.id = i.idPisoAula
        inner join Edificios_Pisos ep on ep.id = pa.idEdificioPiso
        inner join Edificios e on e.id = ep.idEdificio
        where e.id = @Id`
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
        let returnArray = null
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('Nombre',            sql.NChar, incidente.nombre)
            .input('Descripcion',       sql.NChar, incidente.descripcion)
            .input('IdUsuario',         sql.Int, incidente.idUsuario)
            .input('IdPisoAula',        sql.Int, incidente.idPisoAula)
            .input('Fecha',             sql.Date, incidente.fecha)
            .input('Importancia',       sql.Int, incidente.importancia)
            .input('Estado',            sql.Int, incidente.estado)
            .input('IdUsuarioSolucion', sql.Int, incidente.idUsuarioSolucion)
            .input('Categoria',         sql.Int, incidente.categoria)
            .query(`INSERT INTO Incidentes (nombre, descripcion, idUsuario, idPisoAula, fecha, importancia, estado, idUsuarioSolucion, categoria) 
            VALUES (@Nombre, @Descripcion, @IdUsuario, @IdPisoAula, @Fecha, @Importancia, @Estado, @IdUsuarioSolucion, @Categoria)`);
            returnArray = result.recordsets[0]
            /*{
                recordsets: [],
                recordset: undefined,
                output: {},
                rowsAffected: [ 1 ]
            }*/
            console.log(result)
        } catch (error) {
            console.log(error);
            throw new Error("No se pudo hacer el INSERT de INCIDENTE")
        }
        return returnArray;
    }
}

export default IncidenteService