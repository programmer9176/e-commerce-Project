import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react"

// Create the context
const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    })

    // default axios 

    axios.defaults.headers.common["Authorization"] = auth?.token

    useEffect(() => {
        const data = localStorage.getItem("auth");

        if (data) {
            const parseData = JSON.parse(data);

            setAuth({
                ...auth,
                user: parseData.user,
                token: parseData.token
            })
        }

        //eslint disable next line
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to use the auth context
const useAuth = () => useContext(AuthContext)

export { useAuth, AuthProvider }
