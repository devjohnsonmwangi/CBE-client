import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as quizzesApi from '../api/quizzes'
import type { CreateQuizDto, CreateQuestionDto, SubmitAnswersDto } from '../types/quizzes'

export function useQuiz(id: string | number) {
  return useQuery({ queryKey: ['quiz', id], queryFn: () => quizzesApi.getQuiz(id) })
}

export function useCreateQuiz() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (payload: CreateQuizDto) => quizzesApi.createQuiz(payload), onSuccess: () => qc.invalidateQueries({ queryKey: ['quizzes'] }) })
}

export function useAddQuestion() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: (payload: CreateQuestionDto) => quizzesApi.addQuestionToQuiz(payload), onSuccess: () => qc.invalidateQueries({ queryKey: ['quizzes'] }) })
}

export function useStartAttempt() {
  return useMutation({ mutationFn: ({ id, studentId }: { id: string | number; studentId: number }) => quizzesApi.startQuizAttempt(id, studentId) })
}

export function useSubmitAnswers() {
  const qc = useQueryClient()
  return useMutation({ mutationFn: ({ attemptId, payload }: { attemptId: string | number; payload: SubmitAnswersDto }) => quizzesApi.submitQuizAnswers(attemptId, payload), onSuccess: () => qc.invalidateQueries({ queryKey: ['quizAttempts'] }) })
}

export function useAttemptResult(attemptId: string | number) {
  return useQuery({ queryKey: ['attemptResult', attemptId], queryFn: () => quizzesApi.getAttemptResult(attemptId) })
}
