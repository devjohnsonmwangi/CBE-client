import { http } from './http';

export interface DocumentModel {
  id: number;
  title: string;
  url?: string;
  description?: string;
}

// TODO: replace `any` payload types with generated DTOs for documents when available
export const listDocuments = (params?: Record<string, any>) => {
  const q = params ? `?${new URLSearchParams(params).toString()}` : '';
  return http<DocumentModel[]>(`documents${q}`);
};

export const getDocument = (id: string) => http<DocumentModel>(`documents/${id}`);
export const createDocument = (payload: any) => http<DocumentModel>('documents', { method: 'POST', body: JSON.stringify(payload) });
export const updateDocument = (id: string, payload: any) => http<DocumentModel>(`documents/${id}`, { method: 'PUT', body: JSON.stringify(payload) });
export const deleteDocument = (id: string) => http(`documents/${id}`, { method: 'DELETE' });
