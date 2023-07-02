const API = import.meta.env.VITE_URL_API

const useFetch = async(endpoint, data, method = 'POST') => {
    if(!endpoint) throw new Error("Endpoint no establecido!")
    let isImg = endpoint.startsWith('/img')
    if(!data) return get(endpoint, isImg)

    return post_put(endpoint, data, method.toUpperCase())
}

const get = async(endpoint, isImg) => {
    try {
        const response = await fetch(`${API}${endpoint}`, {
            method: 'GET',
            headers: {
                "Origin": "https://darkapple55.github.io/app-reportes",
            }
        })
        try {
            return await response.json()
        } catch {
            if (isImg) return response.url
            throw new Error("No se pudo realizar el fetch tipo GET :(")
        }
    }
    catch {
        throw new Error("No se pudo realizar el fetch tipo GET :(")
    }
}

const post_put = async(endpoint, newData, method) => {
    try {
        const response = await fetch(`${API}${endpoint}`, {
            method: method,
            headers: { "Accept": 'application/json', "Content-Type": 'application/json', },
            body: JSON.stringify(newData)
        })
        return await response.json()
    }
    catch {
        throw new Error(`No se pudo realizar el fetch tipo ${method} :(`)
    }
}

export default useFetch