import { http } from './http'
import type { CreateQuizDto, CreateQuestionDto, SubmitAnswersDto } from '../types/quizzes'

export const createQuiz = (payload: CreateQuizDto) => http('quizzes', { method: 'POST', body: JSON.stringify(payload) })

export const addQuestionToQuiz = (payload: CreateQuestionDto) => http('quizzes/questions', { method: 'POST', body: JSON.stringify(payload) })

export const getQuiz = (id: string | number) => http(`quizzes/${id}`)

export const startQuizAttempt = (id: string | number, studentId: number) => http(`quizzes/${id}/start-attempt`, { method: 'POST', body: JSON.stringify({ student_id: studentId }) })

export const submitQuizAnswers = (attemptId: string | number, payload: SubmitAnswersDto) => http(`quizzes/attempts/${attemptId}/submit`, { method: 'POST', body: JSON.stringify(payload) })

export const getAttemptResult = (attemptId: string | number) => http(`quizzes/attempts/${attemptId}/result`)
