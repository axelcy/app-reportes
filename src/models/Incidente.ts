class Incidente {
    descripcion: string
    idUsuario: number
    idPisoAula: number
    fecha: Date
    nivel: number
    constructor(descripcion: string, idUsuario: number, idPisoAula: number, fecha: Date, nivel: number){
        this.descripcion = descripcion
        this.idUsuario = idUsuario
        this.idPisoAula = idPisoAula
        this.fecha = fecha
        this.nivel = nivel
    }
}

export default Incidente