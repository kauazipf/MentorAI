// services/skillService.ts
import { api } from "./api";

export type SkillDTO = {
  id?: number;
  nome: string;
  descricao?: string;
};

export async function listSkills() {
  const r = await api.get<SkillDTO[]>("/Skill");
  return r.data || [];
}

export async function createSkill(payload: SkillDTO) {
  const r = await api.post<SkillDTO>("/Skill", payload);
  return r.data;
}

export async function getSkillById(id: string | number) {
  const r = await api.get<SkillDTO>(`/Skill/${id}`);
  return r.data;
}
