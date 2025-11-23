import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxArrowLeft, RxArrowRight } from "react-icons/rx";

import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";

import { Spinner } from "@/shared/components/Spinner";
import { Card } from "@/shared/components/Card";
import { api } from "@/shared/service/backend-api";
import { type I_Question } from "@/shared/types";
import { Toast } from "@/shared/components/Toast";
import { getErrorMessage } from "@/shared/utils/get-error-message";
import { Stopwatch } from "@/shared/components/Stopwatch";

// Componente principal do Quiz
export const Quiz = () => {
  // Estado para armazenar as perguntas do quiz
  const [questions, setQuestions] = useState<I_Question[]>([]);
  // Índice da pergunta atual
  const [currentIndex, setCurrentIndex] = useState(0);
  // Respostas do usuário (índice da alternativa escolhida ou null)
  const [answers, setAnswers] = useState<number[]>([]);
  // Indica se os dados ainda estão sendo carregados
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  /**
   * Submete as respostas do usuário e navega para a página de resultado
   */
  const handleSubmit = () => {
    const userResponse = questions.map((q, i) => ({
      id: q.id,
      answer: answers[i],
    }));

    // Navega para página de resultado passando respostas via state
    navigate("/resultado", { state: { userResponse } });
  };

  /**
   * Carrega as perguntas do quiz ao montar o componente
   */
  useEffect(() => {
    api
      .get<I_Question[]>("/questions")
      .then((res) => {
        setQuestions(res.data);
        setAnswers(Array(res.data.length).fill(null));
        setLoading(false);
      })
      .catch((error) => {
        Toast({
          title: getErrorMessage(error),
          type: "error",
        });
      });
  }, []);

  /**
   * Adiciona proteção para impedir que o usuário atualize ou feche a página sem querer e perda de progresso.
   * Função de proteção para eventos de recarregamento/fechamento de página.
   */
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

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
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  // Pergunta atual (baseada no índice)
  const currentQuestion = questions[currentIndex];

  // Verifica se está na última pergunta
  const lastQuestion = currentIndex === questions.length - 1;

  // Texto/exibição do botão "Próxima" ou "Finalizar"
  const nextButtonText = lastQuestion ? "Finalizar" : <RxArrowRight />;

  // Habilita/desabilita botão "Próxima" conforme resposta
  const isNextButtonDisabled = answers[currentIndex] === null;

  // Avança para próxima pergunta ou finaliza quiz
  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      handleSubmit(); // Finaliza se já está na última
    }
  };

  // Retrocede para pergunta anterior
  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Seleciona/desseleciona uma alternativa para a pergunta atual
  const handleSelect = (altIndex: number) => {
    setAnswers((prev) => {
      const newAnswers = [...prev]; // Alterna seleção: se já estava selecionada, limpa
      newAnswers[currentIndex] =
        newAnswers[currentIndex] === altIndex ? -1 : altIndex;
      return newAnswers;
    });
  };

  return (
    <>
      {loading ? (
        // Exibe spinner enquanto carrega perguntas
        <Spinner />
      ) : (
        <Stack gap={5} minH="100vh" align="center" justify="center">
          <Box position="relative" width="100%" maxW="600px">
            <Card
              position="absolute"
              top={-10}
              right={1}
              bg="bg.card"
              rounded="xl"
              shadow="button"
              p={1}
              maxW="70px"
              w="100%"
              textAlign="center"
            >
              <Stopwatch
                userResponse={questions.map((q, i) => {
                  return {
                    id: q.id,
                    answer: answers[i],
                  };
                })}
              />
            </Card>
            <Card
              bg="bg.card"
              rounded="xl"
              shadow="button"
              p={5}
              maxW="600px"
              w="100%"
            >
              {/* Exibe cronômetro regressivo para concluir o quiz, redirecionando automaticamente para o resultado ao final */}
              <Box mb={4}>
                <Box mb={4}>
                  <Heading>
                    {/* Exibe enunciado da pergunta atual */}
                    {currentIndex + 1}. {currentQuestion.question}
                  </Heading>
                </Box>
                {/* Renderiza alternativas */}
                {currentQuestion.alternatives.map((alt, i) => (
                  <Button
                    key={i}
                    justifyContent="flex-start"
                    variant="outline"
                    p={3}
                    w="100%"
                    border="1px solid #ccc"
                    borderRadius="md"
                    bg={
                      answers[currentIndex] === i ? "color.blue" : "transparent"
                    }
                    color={
                      answers[currentIndex] === i ? "color.white" : "black"
                    }
                    _hover={{
                      bg: "gray.300",
                    }}
                    h="50px"
                    mt={3}
                    onClick={() => handleSelect(i)}
                  >
                    ({String.fromCharCode(65 + i)}) {alt}
                  </Button>
                ))}
              </Box>

              <Box>
                {/* Mostra progresso do quiz */}
                <Text color="gray" mb={4} textAlign="center">
                  Pergunta {currentIndex + 1} de {questions.length}
                </Text>

                {/* Botões de navegação (anterior/próxima) */}
                <Box display="flex" gap={4} justifyContent="space-between">
                  <Button
                    onClick={prevQuestion}
                    disabled={currentIndex === 0}
                    variant="outline"
                    color="blue"
                    borderColor="color.blue"
                    rounded="4xl"
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
                    <RxArrowLeft />
                  </Button>

                  <Button
                    onClick={nextQuestion}
                    disabled={isNextButtonDisabled}
                    bg="color.blue"
                    color="white"
                    rounded="4xl"
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
                    {nextButtonText}
                  </Button>
                </Box>
              </Box>
            </Card>
          </Box>
        </Stack>
      )}
    </>
  );
};
