/**
 * Interface para representar uma questão de múltipla escolha
 */
export interface I_Question {
  id: number;
  question: string;
  alternatives: string[];
  correctAnswer: number;
}