// context/AuthContext.tsx
import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login as apiLogin, register as apiRegister, UserDTO } from "../services/auth";
import { setOnSignOut } from "../services/api";

export const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [loading, setLoading] = useState(true);

  // restaura sessão local
  useEffect(() => {
    (async () => {
      try {
        const stored = await AsyncStorage.getItem("MENTORAI_USER");
        if (stored) setUser(JSON.parse(stored));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signIn = async (email: string) => {
    const u = await apiLogin(email);
    setUser(u);
    await AsyncStorage.setItem("MENTORAI_USER", JSON.stringify(u));
  };


  const signOut = async () => {
    setUser(null);
    await AsyncStorage.removeItem("MENTORAI_USER");
  };

  const register = async (payload: UserDTO) => {
    const u = await apiRegister(payload);
    return u;
  };

  useEffect(() => {
    setOnSignOut(signOut);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, register }}>
      {children}
    </AuthContext.Provider>
  );
};
