import React from "react";
import { Box } from "@chakra-ui/react";
/**
 * Estilo global no Body para toda a aplicação
 */
export const GlobalStyled = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      minH="100vh"
      bg="bg.body"
      boxSizing="border-box"
      fontFamily="body"
      px={4}
      py={2}
    >
      {children}
    </Box>
  );
};
