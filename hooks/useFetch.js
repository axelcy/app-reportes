const API = 'http://192.168.50.164:3001'

const useFetch = async(endpoint) => {
    try {
        const response = await fetch(`${API}${endpoint}`)
        try {
            return await response.json()
        } catch {
            return response.url
        }
    }
    catch (err) {
        console.log(err)
        throw new Error("No se pudo realizar el fetch :(")
    }
}

export default useFetch