import DbService from "./src/services/db-service.ts"

console.clear()

const dbService = new DbService()
console.log("getEdificios", await dbService.getEdificios())
console.log("getIncidentes", await dbService.getIncidentes())
console.log("getAulaById", await dbService.getAulaById(1))
console.log("getPisoById", await dbService.getPisoById(2))