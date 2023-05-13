const useFetch = async(endpoint) => {
    try {
        const response = await fetch(`${process.env._URL_API}${endpoint}`)
        return await response.json()
    }
    catch (err) {
        console.log(err)
        throw new Error("No se pudo realizar el fetch :(")
    }
}

export default useFetch