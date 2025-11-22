import { Spinner as ChakraSpinner, Text, VStack } from "@chakra-ui/react";

/**
 * Um Spinner padrão para a aplicação
 */
export const Spinner = () => {
  return (
    <VStack justifyContent="center" alignItems="center" minH="100vh">
      <ChakraSpinner color="blue" size="lg" borderWidth="4px" />
      <Text fontWeight="medium" fontSize="xl" color="color.black">
        Carregando...
      </Text>
    </VStack>
  );
};
