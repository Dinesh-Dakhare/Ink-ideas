import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create Context
const UserContext = createContext();

// Custom hook for easy usage
export const useUser = () => useContext(UserContext);

// Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // login: just set user data
  const login = (userData,token) => {
    setUser(userData);
     if (token) {
      localStorage.setItem("token", token);
    }
  };

  // logout: clear user data
  const logout = () => {
    setUser(null);
       localStorage.removeItem("token");       // clear token
     window.location.href = "/login"; // hard reload 
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
