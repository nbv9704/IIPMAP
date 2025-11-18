"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { AuthResponse } from "@/types/auth";

export type AuthUser = AuthResponse | null;

export interface AuthContextValue {
  user: AuthUser;
  isAuthenticated: boolean;
  login: (auth: AuthResponse) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser>(null);

  // đọc user từ localStorage khi load FE
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const stored = localStorage.getItem("currentUser");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const login = (auth: AuthResponse) => {
    setUser(auth);
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", auth.accessToken);
      localStorage.setItem("currentUser", JSON.stringify(auth));
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("currentUser");
    }
  };

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// hook dùng trong component
export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  // DÒNG BÁO LỖI Ở ĐÂY
  if (!ctx) throw new Error("useAuth phải dùng trong <AuthProvider>");
  return ctx;
};
