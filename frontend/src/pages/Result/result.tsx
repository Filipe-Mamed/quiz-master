import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Box, Heading, Text, Stack } from "@chakra-ui/react";

import { type I_ValidationResult } from "@/shared/types";
import { api } from "@/shared/service/backend-api";
import { Spinner } from "@/shared/components/Spinner";
import { Card } from "@/shared/components/Card";
import { Button } from "@/shared/components/Button";
import { Toast } from "@/shared/components/Toast";
import { getErrorMessage } from "@/shared/utils/get-error-message";

// Componente responsável por exibir o resultado do quiz
export const Result = () => {
  // Estado para armazenar o resultado da validação das respostas
  const [result, setResult] = useState<I_ValidationResult>();
  // Estado para controlar se está carregando a validação
  const [loading, setLoading] = useState(true); // Obtém o objeto de localização, útil para acessar dados enviados via state
  const location = useLocation();

  // Obtém o objeto de navegação para trocar de página
  const navigate = useNavigate();

  /**
   * Ao montar o componente, faz a requisição para validar as respostas do usuário
   */
  useEffect(() => {
    const { userResponse } = location.state;

    api
      .post("/validation", userResponse) // Envia as respostas para validação no backend
      .then((res) => {
        setResult(res.data);
        setLoading(false);
      })
      .catch((error) => {
        Toast({
          title: getErrorMessage(error),
          type: "error",
        });
      });
  }, [location.state]);

  /**
   * Impede o usuário de voltar para a página anterior usando o botão "Voltar" do navegador.
   * Quando o usuário tenta voltar (evento "popstate"), ele é redirecionado imediatamente para a Home ("/").
   */
  useEffect(() => {
    const handlePopState = () => {
      navigate("/", { replace: true });
    };
    window.removeEventListener("popstate", handlePopState);

    return () => {
      window.addEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  // Função para reiniciar o quiz
  const handleRestartQuiz = () => {
    navigate("/quiz");
  };

  // Função para voltar para a Home
  const handleHome = () => {
    navigate("/");
  };

  // Mensagem de feedback que será exibida para o usuário
  let feedbackMessage = "";

  // Calcula a porcentagem de acertos, caso o resultado esteja disponível
  const percentage = result?.score ?? -1;

  // Define a mensagem de feedback de acordo com a pontuação
  if (percentage === 100) {
    feedbackMessage = "Perfeito! Você acertou todas as perguntas!";
  } else if (percentage >= 80) {
    feedbackMessage = "Excelente! Você acertou quase tudo!";
  } else if (percentage >= 50) {
    feedbackMessage = "Bom trabalho! Você tem bons conhecimentos.";
  } else if (percentage >= 30) {
    feedbackMessage = "Você pode melhorar. Continue estudando!";
  } else {
    feedbackMessage = "Tente novamente. A prática leva à perfeição!";
  }

  return (
    <>
      {/* Exibe spinner enquanto aguarda resultado da validação */}
      {loading ? (
        <Spinner />
      ) : (
        // Exibe cartão com o resultado do quiz
        <Card>
          <Box textAlign="center" mb={6}>
            <Heading as="h2" size="2xl" mb={4} color="black">
              Quiz Finalizado
            </Heading>
            {/* Exibe número de acertos e total de perguntas */}
            <Text
              fontSize="xl"
              color="text.secondary"
              fontWeight="medium"
              mb={2}
            >
              Você acertou {result?.correctAnswers} de {result?.totalQuestions}{" "}
              perguntas!
            </Text>
            {/* Exibe porcentagem de acertos */}
            <Text fontSize={"lg"} fontWeight={"medium"}>
              Pontuação {result?.score}%
            </Text>
            {/* Exibe mensagem de feedback conforme desempenho */}
            <Text fontSize={"lg"} mt={6} mb={4}>
              {feedbackMessage}
            </Text>
            {/* Botões para refazer quiz ou voltar ao início */}
            <Stack
              w={"100%"}
              maxW={"600px"}
              justify={"space-between"}
              mt={4}
              direction={{ base: "column-reverse", md: "row" }}
              gap={4}
            >
              <Button
                onClick={handleHome}
                variant="outline"
                color="blue"
                borderColor="color.blue"
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
                Voltar ao Início
              </Button>
              <Button
                onClick={handleRestartQuiz}
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
                Refazer Quiz
              </Button>
            </Stack>
          </Box>
        </Card>
      )}
    </>
  );
};
