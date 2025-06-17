// // context/AuthContext.js
// import { useState, useEffect, createContext, useContext } from "react";

// const AuthContext = createContext('false');

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       setIsLoggedIn(true);
//     }
//     setLoading(false); // Mark auth check complete
//   }, []);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, loading }}>
//       {!loading && children} {/* Don't load children until auth is checked */}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useContext, useState, ReactNode } from "react";

// Types
interface AuthContextType {
    userId: string | null;
    token: string | null;
    setUserId: (id: string | null) => void;
    setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(localStorage.getItem("userId"));
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

    return (
        <AuthContext.Provider value={{ userId, token, setUserId, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
