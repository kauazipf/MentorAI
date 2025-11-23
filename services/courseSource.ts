// services/courseService.ts
import { api } from "./api";

export type CourseDTO = {
  id?: number;
  nome?: string;        // a API provavelmente usa PT-BR
  descricao?: string;
  // se tiver mais campos no swagger, pode adicionar depois
};

export async function listCourses() {
  const r = await api.get<CourseDTO[]>("/Course");
  return r.data || [];
}

export async function getCourseById(id: string | number) {
  const r = await api.get<CourseDTO>(`/Course/${id}`);
  return r.data;
}

export async function createCourse(payload: CourseDTO) {
  const r = await api.post<CourseDTO>("/Course", payload);
  return r.data;
}
