import { createContext, useContext, useState } from "react";
import api from "./api";

const AuthCtx = createContext(null);
export const useAuth = () => useContext(AuthCtx);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async (email, password) => {
    const { data } = await api.post("/users/login", { email, password });
    localStorage.setItem("token", data.token);
    setToken(data.token);
    return data;
  };

  const logout = () => { localStorage.removeItem("token"); setToken(null); };

  return <AuthCtx.Provider value={{ token, login, logout }}>{children}</AuthCtx.Provider>;
}
