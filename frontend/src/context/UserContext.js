import { createContext, useContext, useState } from "react"

const DetailContext = createContext()

const UserProvider = ({ children }) => {
    const [fileUrl, setFileURL] = useState()
    return (
        <DetailContext.Provider value={{ fileUrl, setFileURL }}>
            {children}
        </DetailContext.Provider>
    )
}

export const UserState = () => { return useContext(DetailContext) }

export default UserProvider