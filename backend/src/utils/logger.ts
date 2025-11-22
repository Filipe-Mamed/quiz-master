// Console log personalizado

import chalk from "chalk";
import fs from "fs";
import path from "path";

// Tipos de log
type LogLevel = "SUCCESS" | "INFO" | "WARNING" | "ERROR";

// Caminho para o arquivo de log
// const logFilePath = path.join(__dirname, "../../logs/application.log");

// Garantir que o diretório de logs exista
// const ensureLogDirectory = (): void => {
//   const logDir = path.dirname(logFilePath);
//   if (!fs.existsSync(logDir)) {
//     fs.mkdirSync(logDir, { recursive: true });
//   }
// };

// Formatar timestamp
const getTimestamp = (): string => {
  return new Date().toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    fractionalSecondDigits: 3,
  });
};

// Escrever no arquivo de log
const writeToFile = (
  level: LogLevel,
  context: string,
  message: string
): void => {
  // ensureLogDirectory();

  const timestamp = getTimestamp();
  const logEntry = `[${timestamp}] [${level}] [${context}] ${message}\n`;

  // fs.appendFileSync(logFilePath, logEntry, { encoding: "utf8" });
};

// Função base para logging
const log = (
  level: LogLevel,
  context: string,
  message: string,
  ...optionalParams: any[]
): void => {
  const timestamp = getTimestamp();

  // Definir cores para cada nível
  const getColor = () => {
    switch (level) {
      case "SUCCESS":
        return { text: chalk.green, bg: chalk.bgGreen };
      case "INFO":
        return { text: chalk.blue, bg: chalk.bgBlue };
      case "WARNING":
        return { text: chalk.yellow, bg: chalk.bgYellow };
      case "ERROR":
        return { text: chalk.red, bg: chalk.bgRed };
      default:
        return { text: chalk.white, bg: chalk.bgWhite };
    }
  };

  const colors = getColor();

  // Log no console
  console.log(
    chalk.gray("[") +
      chalk.white(timestamp) +
      chalk.gray("]") +
      chalk.gray(" [") +
      colors.bg.black(` ${level.padEnd(7)} `) +
      chalk.gray("]") +
      chalk.gray(" [") +
      chalk.magenta(context) +
      chalk.gray("]") +
      chalk.gray(" ›") +
      colors.text(" " + message),
    ...optionalParams
  );

  // Log no arquivo
  writeToFile(level, context, message);
};

// Funções específicas para cada nível de log
const success = (
  context: string,
  message: string,
  ...optionalParams: any[]
): void => {
  log("SUCCESS", context, message, ...optionalParams);
};

const info = (
  context: string,
  message: string,
  ...optionalParams: any[]
): void => {
  log("INFO", context, message, ...optionalParams);
};

const warn = (
  context: string,
  message: string,
  ...optionalParams: any[]
): void => {
  log("WARNING", context, message, ...optionalParams);
};

const error = (
  context: string,
  message: string,
  ...optionalParams: any[]
): void => {
  log("ERROR", context, message, ...optionalParams);
};

// Funções pré-configuradas para contextos comuns
export const logger = {
  controller: {
    success: (message: string, ...params: any[]) =>
      success("CONTROLLER", message, ...params),
    info: (message: string, ...params: any[]) =>
      info("CONTROLLER", message, ...params),
    warn: (message: string, ...params: any[]) =>
      warn("CONTROLLER", message, ...params),
    error: (message: string, ...params: any[]) =>
      error("CONTROLLER", message, ...params),
  },

  service: {
    success: (message: string, ...params: any[]) =>
      success("SERVICE", message, ...params),
    info: (message: string, ...params: any[]) =>
      info("SERVICE", message, ...params),
    warn: (message: string, ...params: any[]) =>
      warn("SERVICE", message, ...params),
    error: (message: string, ...params: any[]) =>
      error("SERVICE", message, ...params),
  },

  route: {
    success: (message: string, ...params: any[]) =>
      success("ROUTE", message, ...params),
    info: (message: string, ...params: any[]) =>
      info("ROUTE", message, ...params),
    warn: (message: string, ...params: any[]) =>
      warn("ROUTE", message, ...params),
    error: (message: string, ...params: any[]) =>
      error("ROUTE", message, ...params),
  },

  database: {
    success: (message: string, ...params: any[]) =>
      success("DATABASE", message, ...params),
    info: (message: string, ...params: any[]) =>
      info("DATABASE", message, ...params),
    warn: (message: string, ...params: any[]) =>
      warn("DATABASE", message, ...params),
    error: (message: string, ...params: any[]) =>
      error("DATABASE", message, ...params),
  },

  middleware: {
    success: (message: string, ...params: any[]) =>
      success("MIDDLEWARE", message, ...params),
    info: (message: string, ...params: any[]) =>
      info("MIDDLEWARE", message, ...params),
    warn: (message: string, ...params: any[]) =>
      warn("MIDDLEWARE", message, ...params),
    error: (message: string, ...params: any[]) =>
      error("MIDDLEWARE", message, ...params),
  },

  server: {
    success: (message: string, ...params: any[]) =>
      success("SERVER", message, ...params),
    info: (message: string, ...params: any[]) =>
      info("SERVER", message, ...params),
    warn: (message: string, ...params: any[]) =>
      warn("SERVER", message, ...params),
    error: (message: string, ...params: any[]) =>
      error("SERVER", message, ...params),
  },
};
