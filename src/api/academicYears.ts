import { http } from './http';
import type { CreateAcademicYearDto, UpdateAcademicYearDto } from '../types';

export interface AcademicYear {
  id: number;
  school_id: number;
  year_name: string;
  start_date: string;
  end_date: string;
}

export const listAcademicYears = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<AcademicYear[]>(`academic-years${q}`);
};

export const getAcademicYear = (id: string) => http<AcademicYear>(`academic-years/${id}`);
export const createAcademicYear = (payload: CreateAcademicYearDto) => http<AcademicYear>('academic-years', { method: 'POST', body: JSON.stringify(payload) });
export const updateAcademicYear = (id: string, payload: UpdateAcademicYearDto) => http<AcademicYear>(`academic-years/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteAcademicYear = (id: string) => http(`academic-years/${id}`, { method: 'DELETE' });
