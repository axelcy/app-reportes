import DbService from "./src/services/db-service.ts"

console.clear()

const dbService: DbService = new DbService()
console.log("getEdificios", await dbService.getEdificios())