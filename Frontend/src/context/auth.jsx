import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import { compressUser, decompress } from "../services/encryptCookie";

// Contexto
export const AuthContext = createContext({
  user: {},
  addUser: () => {},
  logout: () => {},
  login: () => {},
});

// Provider
export function AuthProvider({ children }) {
  const login = useCallback(function (authTokens) {
    Cookies.set("sesion_security_token", JSON.stringify(authTokens));
  }, []);

  const logout = useCallback(function () {
    try {
      setUser({});
      Cookies.remove("user");
      Cookies.remove("sesion_security_token");
    } catch (error) {
      console.error("Error removing cookies:", error);
    }
  }, []);

  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      try {
        const parsedUser = decompress(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      Cookies.set("user", compressUser(user), { expires: 7 });
    }
  }, [user]);

  const addUser = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  const value = useMemo(
    () => ({
      user,
      addUser,
      logout,
      login,
    }),
    [user, addUser, logout, login]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
