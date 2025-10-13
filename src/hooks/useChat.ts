import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../api/chat'

// The backend chat API exposes sendMessage/readMessage/createConversation/queryChatbot
// There's no list endpoint in the scaffold; return an empty array for list queries to keep hooks stable.
export function useChat(params?: Record<string, any>) {
  return useQuery({ queryKey: ['chat', params || {}], queryFn: async () => [] })
}

export function useSendMessage() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (data: any) => api.sendMessage(data), onSuccess: () => qc.invalidateQueries({ queryKey: ['chat'] }) })
}

export function useCreateConversation() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (data: any) => api.createConversation(data), onSuccess: () => qc.invalidateQueries({ queryKey: ['chat'] }) })
}

