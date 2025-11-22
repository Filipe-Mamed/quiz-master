import { Request, Response } from "express";
import { HttpStatus } from "../constants/httpStatus";
import { logger } from "../utils/logger";
import { questionsService } from "../service/questionsService";

/**
 * Controlador para gerenciar perguntas e validação
 */
export const questionsController = {
  getQuestions: async (req: Request, res: Response) => {
    try {
      /**
       * Obtém as perguntas do service
       */
      const questions = await questionsService.readQuestions();
      /**
       * Retorna as perguntas como resposta
       */
      logger.controller.info(`GET /questions - Requisição bem-sucedida`);
      return res.status(HttpStatus.OK_200).json(questions);
    } catch (error: any) {
      /**
       * Trata erros e retorna uma resposta apropriada
       */
      logger.controller.error("GET /questions - Requisição falhou", error);
      if (error.statusCode) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR_500)
        .json({ message: "Erro ao obter perguntas" });
    }
  },
  postValidation: async (req: Request, res: Response) => {
    try {
      /**
       * Valida as respostas do usuário
       */
      const userResponses = req.body;
      const validationResult = await questionsService.validateAnswers(
        userResponses
      );
      /**
       * Retorna o resultado da validação como resposta
       */
      logger.controller.info(`POST /validation - Requisição bem-sucedida`);
      return res.status(HttpStatus.OK_200).json(validationResult);
    } catch (error: any) {
      /**
       * Trata erros e retorna uma resposta apropriada
       */
      logger.controller.error("POST /validation - Requisição falhou", error);
      if (error.statusCode) {
        return res.status(error.statusCode).json({ message: error.message });
      }
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR_500)
        .json({ message: "Erro ao validar respostas" });
    }
  },
};
