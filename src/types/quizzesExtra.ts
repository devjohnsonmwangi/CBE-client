export interface CreateQuizDto {
  title: string;
  description?: string;
  courseId?: number;
}

export interface CreateQuestionDto {
  quizId: number;
  text: string;
  options?: string[];
  answer?: string | number;
}

export interface SubmitAnswersDto {
  quizId: number;
  answers: Record<string, any>;
}
