// context/auth-context.tsx
import { createContext, useEffect, useState } from 'react';

interface AuthContextType {
    userId: string | null;
    token: string | null;
    login: (userId: string, token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    userId: null,
    token: null,
    login: () => { },
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        const storedToken = localStorage.getItem('token');
        if (storedUserId && storedToken) {
            setUserId(storedUserId);
            setToken(storedToken);
        }
    }, []);

    const login = (userId: string, token: string) => {
        setUserId(userId);
        setToken(token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUserId(null);
        setToken(null);
        localStorage.removeItem('userId');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ userId, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
