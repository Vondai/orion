import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PublicRoute ({ children }) {

    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <Navigate to='/' /> : children
};