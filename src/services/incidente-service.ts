import sql from 'mssql'
import config from '../../dbconfig-env'
import Incidente from '../models/Incidente'

type Order = 'importancia' | 'fecha' | 'edificio' | 'categoria'

class IncidenteService {
    getAll = async (order: Order) => {
        let query = `
        select i.id, i.nombre, i.descripcion, i.idUsuario, i.fecha, i.idUsuarioSolucion, i.estado, c.descripcion 'Categoria', n.descripcion 'Nivel de Imporancia', e.descripcion 'Edificio' from Incidentes i
		inner join Categorias c on c.id = i.Categoria
        inner join Niveles_Importancia n on n.id = i.Nivel_Importancia
        inner join Pisos_Aulas pa on pa.id = i.Id_Piso_Aula
        inner join Edificios_Pisos ep on ep.id = pa.Id_Edificio_Piso
        inner join Edificios e on e.id = ep.idEdificio
        `
        switch (order) {
            case 'importancia':
                query += " order by i.nivelImportancia desc"
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
    insert = async (Incidente: Incidente) => {
        let returnArray = null

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('Nombre'     , sql.NChar , Incidente?.nombre ?? '')
                .input('Descripcion', sql.NChar   , Incidente?.descripcion ?? '')
                .input('NivelImportancia'    , sql.Int , Incidente?.nivel ?? 0)
                .query(`INSERT INTO Incidentes (nombre, descripcion, nivelImportancia, categoria, aula, fecha) VALUES (@Nombre, @Descripcion, @NivelImportancia, @Categoria, @Aula, @Fecha)`);
                returnArray = result.recordsets[0]
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
}

export default IncidenteService