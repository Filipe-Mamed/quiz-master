import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

/**
 * Configuração do Tema global da aplicação
 */
const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        color: {
          blue: { value: "#2563eb" },
          gray: { value: "#a1a1aa" },
          green: { value: "#22c55e" },
          red: { value: "#dc2626" },
          white: { value: "#FFFFFF"},
        },
        text: {
          black: { value: "#111111" },
          secondary: { value: "#a1a1aa" },
          muted: { value: "#d4d4d8" },
        },
        bg: {
          body: { value: "#f4f4f5" },
          card: { value: "#FFFFFF"},
        },
      },
      fonts: {
        heading: { value: "Poppins, sans-serif" },
        body: { value: "Poppins, sans-serif" },
      },
      // Estilos para botões
      opacity: {
        hover: { value: "0.8" },
        active: { value: "0.6" },
      },
      cursor: {
        pointer: { value: "pointer" },
        notAllowed: { value: "not-allowed" },
      },
      shadows: {
        // Sombra padrão para botões com preto
        button: { value: "0 4px 8px rgba(0, 0, 0, 0.2)" }, // Exemplo: Sombra preta suave
        buttonHover: { value: "0 6px 12px rgba(0, 0, 0, 0.25)" }, // Sombra mais intensa no hover
      },
    },
  },
});

export const theme = createSystem(defaultConfig, config);
