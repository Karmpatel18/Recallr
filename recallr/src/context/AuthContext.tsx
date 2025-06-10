// context/AuthContext.js
import { useState, useEffect, createContext, useContext } from "react";

const AuthContext = createContext('false');

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false); // Mark auth check complete
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading }}>
      {!loading && children} {/* Don't load children until auth is checked */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
