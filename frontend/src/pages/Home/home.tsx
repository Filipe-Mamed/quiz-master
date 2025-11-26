import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Flex, Heading, HStack, Mark, Text } from "@chakra-ui/react";

import { Button } from "@/shared/components/Button";
import { GitHub } from "@/shared/components/Github";
import { useGame } from "@/shared/hooks/useGame";

// Componente principal da página inicial do Quiz
export const Home = () => {
  // Hook para navegar entre páginas usando o react-router
  const navigate = useNavigate();

  // Obtém a função responsável por alterar o estado global "isPlaying"
  // Quando setIsPlaying(true) for chamado, significa que o usuário iniciou o quiz
  const { setIsPlaying } = useGame();

  /**
   * Impede o usuário de voltar para a página anterior usando o botão "Voltar" do navegador.
   * Quando o usuário tenta voltar (evento "popstate"), ele é redirecionado imediatamente para a Home ("/").
   */
  useEffect(() => {
    const handlePopState = () => {
      navigate("/", { replace: true });
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.addEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  /**
   * Inicia o quiz ao clicar no botão "Iniciar Quiz".
   * - Ativa o estado global "isPlaying", permitindo acesso às rotas protegidas.
   * - Em seguida, navega para a tela do quiz.
   */
  const handleStartQuiz = () => {
    setIsPlaying(true);
    navigate("/quiz");
  };
  return (
    <>
      {/* Container principal ocupando toda a tela */}
      <Flex
        align="center"
        justify="center"
        minH="100vh"
        direction="column"
        px={4}
      >
        {/* Card de boas-vindas */}
        <Box
          textAlign="center"
          mb={10}
          bg="bg.card"
          p={10}
          rounded="2xl"
          shadow="button"
          maxW="550px"
        >
          {/* Título principal */}
          <Heading as="h1" size="2xl" color="blue" mb={4}>
            Bem-vindo ao QuizMaster!
          </Heading>

          {/* Subtítulo motivacional */}
          <Text fontSize="lg" fontWeight="medium" color="text.muted" mb={6}>
            Prepare-se para testar seus conhecimentos em um quiz rápido e
            divertido!
          </Text>

          {/* Aviso sobre o tempo limite */}
          <Text fontSize="xl" fontWeight="medium" color="text.muted" mb={6}>
            ⏱ Você terá{" "}
            <Mark bg="blue" color="white" p={1} rounded="md">
              5 minutos
            </Mark>{" "}
            para completar o quiz!
          </Text>

          {/* Descrição mais longa */}
          <Text fontSize="md" color="text.secondary">
            Serão 20 perguntas selecionadas aleatoriamente. Boa sorte!
          </Text>
        </Box>

        {/* Botão para iniciar o Quiz */}
        <Box mb={10}>
          <Button
            bg="color.blue"
            size="lg"
            _hover={{ opacity: "hover", boxShadow: "buttonHover" }}
            _active={{ opacity: "active" }}
            onClick={handleStartQuiz}
          >
            Iniciar Quiz
          </Button>
        </Box>

        {/* Rodapé com assinatura */}
        <HStack gap={2} textAlign="center" justify="center">
          <Text fontSize="sm" color="text.secondary">
            Desenvolvido por Filipe Mamed • QuizMaster 2025
          </Text>
          <Text color="black" mt={0.5}>
            <GitHub />
          </Text>
        </HStack>
      </Flex>
    </>
  );
};
