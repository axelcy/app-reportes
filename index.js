import EdificioService from "./src/services/edificio-services.js"

const getEdificios = async() => JSON.stringify(await new EdificioService().getAll())

console.clear()
console.log(getEdificios())