const useFetch = async(endpoint) => {
    try {
        // const response = await fetch(`${process.env._URL_API}${endpoint}`)
        const response = await fetch(`${import.meta.env.VITE_URL_API}${endpoint}`)
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