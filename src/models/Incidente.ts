class Incidente {
    nombre: string
    descripcion: string
    idUsuario: number
    idPisoAula: number
    fecha: Date
    nivel: number
    constructor(nombre: string, descripcion: string, idUsuario: number, idPisoAula: number, fecha: Date, nivel: number){
        this.nombre = nombre
        this.descripcion = descripcion
        this.idUsuario = idUsuario
        this.idPisoAula = idPisoAula
        this.fecha = fecha
        this.nivel = nivel
    }
}

export default Incidente