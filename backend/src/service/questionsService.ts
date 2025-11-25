import fs from "fs/promises";
import path from "path";

import { NotFoundError } from "../utils/errorsService";
import { logger } from "../utils/logger";
import { shuffle } from "../utils/shuffle";
import { I_Question, I_UserResponse, I_ValidationResult } from "../types";

/**
 * Caminho para o arquivo de perguntas
 */
const pathToQuestions = path.join(process.cwd(), "database", "questions.json")

/**
 * Serviço para gerenciar perguntas e validação de respostas
 */
export const questionsService = {
  readQuestions: async () => {
    /**
     * Lê as perguntas do arquivo questions.json
     */
    const data = await fs.readFile(pathToQuestions, "utf-8");
    const questions = JSON.parse(data);

    if (!data) {
      logger.service.error(
        `Erro ao ler perguntas do arquivo 'database/questions.json'`
      );
      throw new NotFoundError("Erro ao carregar perguntas");
    }

    /**
     * Embaralha as perguntas
     */
    const shuffled = shuffle(questions);

    /**
     * Seleciona as primeiras 20 perguntas
     */
    const selectedQuestions = shuffled.slice(0, 20);
    logger.service.info(
      `Perguntas obtidas com sucesso: ${selectedQuestions.length} itens`
    );
    return selectedQuestions;
  },
  validateAnswers: async (
    userResponses: I_UserResponse[]
  ): Promise<I_ValidationResult> => {
    const data = await fs.readFile(pathToQuestions, "utf-8");
    const questions: I_Question[] = JSON.parse(data);
    let correctAnswers = 0;
    let incorrectAnswers = 0;

    /**
     * Valida as respostas do usuário
     */
    for (const userResponse of userResponses) {
      const question = questions.find((q) => q.id === userResponse.id);

      if (!question) {
        logger.service.error(
          `Pergunta com ID ${userResponse.id} não encontrada`
        );
        throw new NotFoundError(
          `Pergunta com ID ${userResponse.id} não encontrada`
        );
      }
      /**
       * Compara a resposta do usuário com a resposta correta
       */
      if (question.correctAnswer === userResponse.answer) {
        logger.service.success(
          `Resposta correta | Pergunta ID: ${userResponse.id} | Resposta enviada: ${userResponse.answer}`
        );
        correctAnswers++;
      } else {
        logger.service.warn(
          `Resposta incorreta | ID: ${userResponse.id} | Usuário: ${userResponse.answer} | Correta: ${question.correctAnswer}`
        );
        incorrectAnswers++;
      }
    }
    /**
     * Calcula a pontuação do usuário
     */
    const score = Math.round((correctAnswers / userResponses.length) * 100);
    logger.service.info(
      `Validação concluída | Total: ${userResponses.length} | Corretas: ${correctAnswers} | Incorretas: ${incorrectAnswers} | Pontuação: ${score}%`
    );
    return {
      totalQuestions: userResponses.length,
      correctAnswers,
      incorrectAnswers: userResponses.length - correctAnswers,
      score,
    };
  },
};
