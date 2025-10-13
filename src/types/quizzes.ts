export interface CreateOptionDto {
  option_text: string;
  is_correct: boolean;
}

export interface CreateQuestionDto {
  quiz_id: number;
  question_text: string;
  question_type: string;
  order: number;
  options?: CreateOptionDto[];
}

export interface CreateQuizDto {
  title: string;
}

export interface SubmitAnswersDto {
  quizId: number;
  answers: Record<string, any>;
}
