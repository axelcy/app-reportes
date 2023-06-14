import { useContext } from "react"
import { TestContext } from "../context/test"

export default function useTest() {
    try {
        const { test, setTest } = useContext(TestContext)
        if (test === undefined) throw new Error()
        return { test, setTest }
    }
    catch {
        throw new Error("useTest debe estar dentro del provider TestContext")
    }
    
}