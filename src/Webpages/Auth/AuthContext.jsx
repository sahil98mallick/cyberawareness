import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext();
const AuthManage = ({ children }) => {
    const [auth, setauth] = useState({
        user: null,
        token: ""
    })
    useEffect(() => {
        const response = localStorage.getItem("auth");
        const logindata = JSON.parse(response);
        if (logindata) {
            setauth({
                ...auth,
                user: logindata.user,
                token: logindata.token
            })
        }
    }, [])
    return (
        <AuthContext.Provider value={[auth, setauth]}>
            {children}
        </AuthContext.Provider>
    )
}
const useAuth = () => useContext(AuthContext);
export { useAuth, AuthManage }
