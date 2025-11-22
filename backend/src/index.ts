import express from "express";
import dotenv from "dotenv";
import chalk from "chalk";
import cors from "cors";

import { appRouter } from "./routers";

/**
 * Configuração de variáveis de ambiente dotenv
 */
dotenv.config();

const appSetup = {
  main: () => {
    /**
     * Configuração do servidor Express, Porta e Api Frontend
     */
    const app = express();
    const frontendUrl = process.env.FRONTEND_URL;
    const port = process.env.PORT || 3000;

    /**
     * Middleware
     */
    app.use(cors({
        origin: frontendUrl,

      }));
    app.use(express.json());

    /**
     * Rotas
     */
    app.use(appRouter.router());

    /**
     * Iniciar o servidor
     */
    app.listen(port, () => {
      console.log(
        chalk.green(`🚀 Servidor rodando em http://localhost:${port}`)
      );
    });
  },
};

appSetup.main();
