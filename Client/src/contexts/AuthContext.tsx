import React, { createContext, useState, useEffect, useContext } from "react";
import type { ReactNode } from "react";
import type { User, LoginResponse } from "../types";
import { loginUser as apiLoginUser } from "../services/api";
import { toast } from "sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (credentials: {
    username?: string;
    email?: string;
    password?: string;
  }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: {
    username?: string;
    email?: string;
    password?: string;
  }) => {
    setIsLoading(true);
    try {
      const data: LoginResponse = (await apiLoginUser(credentials)).data;
      console.log(data)

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));
      setToken(data.accessToken);
      setUser(data.user);
      setIsAuthenticated(true);
      toast.success("Login Successful", {
        description: `Welcome back, ${data.user.firstName}!`,
      });
    } catch (error: any) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      toast.error("Login Failed", {
        description:
          error.response?.data?.detail ||
          "Invalid credentials or server error.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    toast.info("Logged Out", {
      description: "You have been successfully logged out.",
    });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
