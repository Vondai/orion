import React, { useContext } from "react";
import useLocalStorage from '../hooks/useLocalStorage'
import * as authService from '../services/authService';
const AuthContext = React.createContext();

function AuthProvider({ children }) {

    const initialAuthState = {
        username: '',
        token: '',
    };

    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', initialAuthState);

    async function signUp(username, password) {
        let result = await authService.signUp(username, password);
        return result;
    }
    const value = {
        currentUser,
        signUp,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export {useAuth, AuthProvider};