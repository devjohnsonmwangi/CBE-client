import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/students';
import type { CreateStudentDto } from '../types';

export function useStudents(params?: Record<string, any>) {
  return useQuery({ queryKey: ['students', params || {}], queryFn: () => api.listStudents(params) });
}

export function useStudent(id?: string) {
  return useQuery({ queryKey: ['student', id], queryFn: () => (id ? api.getStudent(id) : Promise.resolve(null)), enabled: !!id });
}

export function useCreateStudent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateStudentDto) => api.createStudent(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['students'] }),
  });
}

export function useLinkParent() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ studentId, data }: { studentId: string | number; data: any }) => api.linkParent(studentId, data), onSuccess: () => qc.invalidateQueries({ queryKey: ['students'] }) })
}
