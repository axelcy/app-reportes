class Incidente {
    id: number
    nombre: string
    descripcion: string
    idUsuario: number
    idPisoAula: number
    fecha: string
    importancia: number
    estado: number
    idUsuarioSolucion: number
    categoria: number
    foto: string
    constructor(nombre: string, descripcion: string, idUsuario: number, idPisoAula: number, fecha: string, importancia: number, estado: number, idUsuarioSolucion: number, categoria: number, foto: string){
        this.nombre = nombre
        this.descripcion = descripcion
        this.idUsuario = idUsuario
        this.idPisoAula = idPisoAula
        this.fecha = fecha
        this.importancia = importancia
        this.estado = estado
        this.idUsuarioSolucion = idUsuarioSolucion
        this.categoria = categoria
        this.foto = foto
    }
}

export default Incidente