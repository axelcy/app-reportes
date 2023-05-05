import sql from 'mssql'
import config from '../../dbconfig-env.js'

class PeliculasService {
    getAll = async () => {
        let returnArray = null;
        console.log('Estoy en: PeliculasService.getAll()');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request().query("SELECT * from Peliculas");
            returnArray = result.recordsets[0];
        }
        catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    getById = async (id) => {
        let returnEntity = null;
        console.log('Estoy en: PeliculasService.getById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pId', sql.Int, id)
            .query('SELECT * FROM Peliculas WHERE id = @pId');
            returnEntity = result.recordsets[0][0];
        } catch (error) {
            console.log(error);
        }
        return returnEntity;
    }

    insert = async (pelicula) => {
        let rowsAffected = 0;
        console.log('Estoy en: PeliculasService.insert(pelicula)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pFechaCreacion', sql.Date, pelicula.FechaCreacion)
            .query(`INSERT INTO Peliculas (Titulo, Imagen, Calificacion, FechaCreacion, Asociados)
            VALUES ('${pelicula.Titulo}', '${pelicula.Imagen}', ${pelicula.Calificacion}, @pFechaCreacion, '${pelicula.Asociados}')`);
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }

    update = async (pelicula) => {
        let rowsAffected = 0;
        console.log('Estoy en: PeliculasService.update(pelicula)');

        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
                .input('pFechaCreacion', sql.Date, pelicula.FechaCreacion)
                .query(`UPDATE Peliculas SET 
                Titulo = '${pelicula.Titulo}',
                Imagen = '${pelicula.Imagen}',
                Calificacion = ${pelicula.Calificacion},
                FechaCreacion = @pFechaCreacion,
                Asociados = '${pelicula.Asociados}'
                WHERE IDd = ${pelicula.id}`);
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
    
    deleteById = async (id) => {
        let rowsAffected = 0;
        console.log('Estoy en: PeliculasService.deleteById(id)');
        try {
            let pool = await sql.connect(config);
            let result = await pool.request()
            .input('pId', sql.Int, id)
            .query('DELETE FROM Peliculas WHERE id = @pId');
            rowsAffected = result.rowsAffected;
        } catch (error) {
            console.log(error);
        }
        return rowsAffected;
    }
}

export default PeliculasService;

