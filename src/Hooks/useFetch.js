const API = import.meta.env.VITE_URL_API

const useFetch = async(endpoint, data) => {
    if(!endpoint) throw new Error("Endpoint no establecido!")
    let isImg = endpoint.startsWith('/img')
    if(!data) return get(endpoint, isImg)
    return post(endpoint, data)
}

const get = async(endpoint, isImg) => {
    try {
        const response = await fetch(`${API}${endpoint}`)
        try {
            return await response.json()
        } catch {
            if (isImg) return response.url
        }
    }
    catch (err) {
        console.log(err)
        throw new Error("No se pudo realizar el fetch tipo GET :(")
    }
}

const post = async(endpoint, newData) => {
    try {
        const response = await fetch(`${API}${endpoint}`, {
            method: 'POST',
            headers: { "Accept": 'application/json', "Content-Type": 'application/json', },
            body: JSON.stringify(newData)
        })
    }
    catch (err) {
        console.log(err)
        throw new Error("No se pudo realizar el fetch tipo POST :(")
    }
}

export default useFetch