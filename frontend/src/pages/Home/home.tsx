import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/react";

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
      <Flex align="center" justify="center" minH="100vh" direction="column">
        {/* Caixa com informações e boas-vindas */}
        <Box
          textAlign="center"
          mb={8}
          bg="bg.card"
          p={10}
          rounded="xl"
          shadow="button"
          maxW="500px"
        >
          <Heading as="h1" size="2xl" color="blue" mb={4}>
            Bem vindo ao QuizMaster!
          </Heading>
          <Text fontSize="md" color="text.muted" mb={8}>
            Você consegue acertar todas as perguntas?
          </Text>
          <Text fontSize="lg" color="text.secondary" mb={4}>
            Teste seus conhecimentos em diversas áreas e divirta-se!
          </Text>
        </Box>
        {/* Botão para iniciar o Quiz */}
        <Box mb={50}>
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
        {/* Rodapé com créditos */}
        <HStack direction="row" textAlign="center" justify="center">
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
