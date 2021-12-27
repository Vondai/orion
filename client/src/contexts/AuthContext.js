import React, { useContext } from "react";
import useLocalStorage from '../hooks/useLocalStorage'
const AuthContext = React.createContext();

const initialAuthState = {
    username: '',
    token: '',
};

function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useLocalStorage('currentUser', initialAuthState);

    function signIn(userData) {
        setCurrentUser(userData);
    }

    function signOut() {
        setCurrentUser(initialAuthState);
    }

    let isAuthenticated = Boolean(currentUser.username);

    let token = currentUser.token;

    const value = {
        currentUser,
        signIn,
        signOut,
        isAuthenticated,
        token,
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