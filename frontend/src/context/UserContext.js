import { createContext, useContext, useState } from "react";


const DetailContext = createContext();

const UserProvider = ({ children }) => {
    const [loadingForLogout, setLoadingForLogout] = useState(false);
    const [token, setToken] = useState()


    return (
        <DetailContext.Provider value={{ loadingForLogout, setLoadingForLogout, token, setToken }}>
            {children}
        </DetailContext.Provider>
    );
};

export const useUser = () => useContext(DetailContext);

export default UserProvider;
