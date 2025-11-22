import { Router } from "express";
import { questionsRouter } from "./questionsRoutes";

// Roteador principal da aplicação que agrega todos os sub-roteadores
export const appRouter = {
  router: () => {
    const router = Router();
    /**
     * Adiciona o roteador de perguntas à rota /api
     */
    router.use("/api", questionsRouter.router());

    return router;
  },
};
