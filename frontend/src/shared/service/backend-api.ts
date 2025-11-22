import axios from "axios";

const backendApiUrl = import.meta.env.VITE_BACKEND_URL;

/**
 * Configuração do axios para chamada para o Back-end
 */
export const api = axios.create({
  baseURL: backendApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
