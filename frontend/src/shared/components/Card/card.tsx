import type React from "react";

import { Box, Flex } from "@chakra-ui/react";

/**
 * Componente "Card" para aplicação
 */
export const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex align="center" justify="center" minH="100vh" direction="column" >
      <Box bg="bg.card" rounded="xl" shadow="button" p={5} maxW="600px" w="100%">
        {children}
      </Box>
    </Flex>
  );
};
