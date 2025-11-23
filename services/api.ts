// services/api.ts
import axios from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

let onSignOut: null | (() => void) = null;
export function setOnSignOut(fn: () => void) {
  onSignOut = fn;
}

/**
 * 1) pega do .env (EXPO_PUBLIC_API_BASE_URL)
 * 2) pega do app.json extra.API_BASE_URL
 * 3) fallback dev
 *
 * ⚠️ Se rodar no CELULAR físico:
 * coloque no .env o IP do seu PC:
 * EXPO_PUBLIC_API_BASE_URL=http://192.168.0.184:5134
 */
const envBaseURL =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  Constants.expoConfig?.extra?.API_BASE_URL;

// fallback pra dev
const devBaseURL =
  Platform.OS === "android"
    ? "http://10.0.2.2:5134" // emulador android
    : "http://localhost:5134";

// garante que não fica com "/" no final
const normalizeBaseURL = (url: string) => url.replace(/\/+$/, "");

export const api = axios.create({
  baseURL: normalizeBaseURL(envBaseURL || devBaseURL),
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// interceptor de resposta
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    const data = err?.response?.data;

    // ✅ loga o erro real no console
    console.log("API ERROR:", status, data ?? err?.message);

    if (status === 401) {
      onSignOut?.();
    }

    return Promise.reject(err);
  }
);
