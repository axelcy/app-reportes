import { createContext, useState } from "react"

export const TestContext = createContext(null)

export const TestProvider = ({ children }) => {
    const [test, setTest] = useState(null)
    
    return (
        <TestContext.Provider value={{test, setTest}}>
            {children}
        </TestContext.Provider>
    )
}