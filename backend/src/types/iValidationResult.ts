// Interface para representar um resultado de validação

export interface I_ValidationResult {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number
}