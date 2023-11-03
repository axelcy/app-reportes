import { createContext, useState } from "react"

export const FooterContext = createContext(null)

export const FooterProvider = ({ children }) => {
    const [footer, setFooter] = useState(null)
    
    return (
        <FooterContext.Provider value={{footer, setFooter}}>
            {children}
        </FooterContext.Provider>
    )
}