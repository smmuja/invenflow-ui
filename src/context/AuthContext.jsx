import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const login = (newToken, userInfo) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userInfo));
    setCurrentUser(userInfo);
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);

      const tokenTimeout = setTimeout(() => {
        // localStorage.removeItem("token");
        setToken(null);
        console.log("Token remove after 1 hour");
      }, 60000 * 60);

      return () => clearTimeout(tokenTimeout);
    } else {
      localStorage.removeItem("token");
    }

    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [token, currentUser]);

  return (
    <AuthContext.Provider value={{ token, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
