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

    async function signIn(username, password) {
        let result = await authService.signIn(username, password);
        if (result.username) {
            setCurrentUser(result);
        }
        return result;
    }

    function signOut() {
        setCurrentUser(initialAuthState);
    }

    const value = {
        currentUser,
        signUp,
        signIn,
        signOut,
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