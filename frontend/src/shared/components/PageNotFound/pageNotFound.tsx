import { Link } from "react-router-dom";

import { Flex, Text, VStack } from "@chakra-ui/react";

import { Button } from "@/shared/components/Button";

// Página exibida quando nenhuma rota é encontrada
export const PageNotFound = () => {
  return (
    // Flex ocupando toda a altura da tela e centralizando tudo
    <Flex h="100vh" align="center" justify="center">
      {/* Empilha os elementos verticalmente com espaçamento */}
      <VStack gap={6} textAlign="center">
        {/* Número 404 em destaque */}
        <Text fontSize="7xl" fontWeight="bold" color="purple.600">
          404
        </Text>
        {/* Título da página de erro */}
        <Text fontSize="2xl" fontWeight="semibold">
          Página não encontrada ❓
        </Text>
        {/* Descrição explicando o erro de rota */}
        <Text fontSize="md" color="gray.600" maxW="350px">
          Parece que você se perdeu no caminho do QuizMaster... Mas não se
          preocupe, vamos te colocar de volta no jogo!
        </Text>
        {/* Botão customizado levando de volta para a Home */}
        <Button
          size="lg"
          borderRadius="full"
          bg="color.blue"
          color="white"
          _hover={{
            boxShadow: "buttonHover",
            bg: "color.blue",
            opacity: "hover",
            color: "white",
          }}
          _active={{
            opacity: "active",
            boxShadow: "buttonHover",
            bg: "color.primary",
            color: "white",
          }}
        >
          {/* Link interno para a página inicial */}
          <Link to="/">Voltar para Home</Link>
        </Button>
      </VStack>
    </Flex>
  );
};
