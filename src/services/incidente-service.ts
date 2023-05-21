import sql from 'mssql'
import config from '../../dbconfig-env'
import Incidente from '../models/Incidente'

type Order = 'importancia' | 'fecha' | 'edificio' | 'categoria'

class IncidenteService {
    getAll = async (order: Order) => {
        let query = `
        select i.Id, i.Nombre, i.Descripcion, i.Id_Usuario, i.Fecha, i.Id_Usuario_Solucion, i.Estado, c.Descripcion 'Categoria', n.Descripcion 'Nivel de Imporancia', e.Descripcion 'Edificio' from Incidentes i
		inner join Categorias c on c.Id = i.Categoria
        inner join Niveles_Importancia n on n.Id = i.Nivel_Importancia
        inner join Pisos_Aulas pa on pa.Id = i.Id_Piso_Aula
        inner join Edificios_Pisos ep on ep.Id = pa.Id_Edificio_Piso
        inner join Edificios e on e.Id = ep.Id_Edificio
        `
        switch (order) {
            case 'importancia':
                query += "order by i.Nivel_Importancia desc"
                break
            case 'fecha':
                query += "order by i.Fecha asc"
                break
            case 'edificio':
                query += "order by ep.Id_Edificio asc"
                break
            case 'categoria':
                query += "order by c.Id asc"
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
        select i.id, i.Nombre, i.Descripcion, i.Fecha, i.Nivel from Incidentes i
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
    insert = async (Incidente: Incidente) => {
        let returnArray = null

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pNombre'     , sql.NChar , Incidente?.nombre ?? '')
                .input('pDescripcion', sql.NChar   , Incidente?.descripcion ?? '')
                .input('pNivel'    , sql.Int , Incidente?.nivel ?? 0)
                // .input('pDescripcion', sql.Int , Incidente?.categoria ?? '')
                // .input('pImporte'    , sql.Int , Incidente?.aula ??)
                // .input('pImporte'    , sql.Date , Incidente?.fecha ?? 0)
                .query(`INSERT INTO Incidentes (Nombre, Descripcion, Nivel_importancia, Categoria, Aula, Fecha) VALUES (@pNombre, @pDescripcion, @pNivel_importancia, @pCategoria, @pAula, @pFecha)`);
                returnArray = result.recordsets[0]
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
}

export default IncidenteService