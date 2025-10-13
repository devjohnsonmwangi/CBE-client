import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from '../api/documents';

export function useDocuments(params?: Record<string, any>) {
  return useQuery({ queryKey: ['documents', params || {}], queryFn: () => api.listDocuments(params) });
}

export function useDocument(id?: string) {
  return useQuery({ queryKey: ['document', id], queryFn: () => (id ? api.getDocument(id) : Promise.resolve(null)), enabled: !!id });
}

export function useCreateDocument() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (data: any) => api.createDocument(data), onSuccess: () => qc.invalidateQueries({ queryKey: ['documents'] }) });
}
