// services/auth.ts
import { api } from "./api";

export type UserDTO = {
  id?: number;
  nome: string;
  email: string;
  cargoAtual: string;
  cargoDesejado: string;
};

export async function register(payload: UserDTO) {
  // API espera: nome, email, cargoAtual, cargoDesejado
  const r = await api.post<UserDTO>("/User", payload);
  return r.data;
}

export async function login(email: string) {
  const r = await api.get<UserDTO[]>("/User");
  const users = r.data || [];

  const found = users.find(
    (u) => u.email?.toLowerCase() === email.toLowerCase()
  );

  if (!found) {
    throw new Error("Usuário não encontrado");
  }

  return found;
}
