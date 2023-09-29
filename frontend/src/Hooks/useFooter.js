import { useContext } from "react"
import { FooterContext } from "../context/footerContext"

export default function useFooter() {
    try {
        const { footer, setFooter } = useContext(FooterContext)
        // if (test === undefined) throw new Error()
        return { footer, setFooter }
    }
    catch {
        throw new Error("useTest debe estar dentro del provider TestContext")
    }
    
}