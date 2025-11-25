import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/shared/styles/theme.ts";
import { GlobalStyled } from "@/global-styled.tsx";
import { Toaster } from "@/components/ui/toaster";
import { GameProvider } from "@/shared/providers";

import { createRoot } from "react-dom/client";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <ChakraProvider value={theme}>
    <GameProvider>
      <GlobalStyled>
        <Toaster />
        <App />
      </GlobalStyled>
    </GameProvider>
  </ChakraProvider>
);
