class Incidente {
    nombre: string
    descripcion: string
    idUsuario: number
    idPisoAula: number
    fecha: string
    nivelImportancia: number
    estado: number
    idUsuarioSolucion: number
    categoria: number
    constructor(nombre: string, descripcion: string, idUsuario: number, idPisoAula: number, fecha: string, nivelImportancia: number, estado: number, idUsuarioSolucion: number, categoria: number){
        this.nombre = nombre
        this.descripcion = descripcion
        this.idUsuario = idUsuario
        this.idPisoAula = idPisoAula
        this.fecha = fecha
        this.nivelImportancia = nivelImportancia
        this.estado = estado
        this.idUsuarioSolucion = idUsuarioSolucion
        this.categoria = categoria
    }
}

export default Incidente