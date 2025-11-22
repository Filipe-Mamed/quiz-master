import { Router } from "express";
import { questionsController } from "../controller/questionsController";

/**
 * Roteamento para perguntas e validação
 */
export const questionsRouter = {
  router: () => {
    const router = Router();

    /**
     * Define routes for questions
     */
    router.get("/questions", questionsController.getQuestions);
    /**
     * Define route for validation
     */
    router.post("/validation", questionsController.postValidation);

    return router;
  },
};
