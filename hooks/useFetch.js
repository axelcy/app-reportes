const API = 'http://192.168.50.164:3001'

const useFetch = async(endpoint, data) => {
    if(!data) return get(endpoint)
    return post(endpoint, data)
}

const get = async(endpoint) => {
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

const post = async(endpoint, newData) => {
    try {
        const response = await fetch(`${API}${endpoint}`, {
            method: 'POST',
            headers: { "Accept": 'application/json', "Content-Type": 'application/json', },
            body: JSON.stringify(newData)
        })
        return await response.json()
    }
    catch (err) {
        console.log(err)
        throw new Error("No se pudo realizar el fetch :(")
    }
}

export default useFetch