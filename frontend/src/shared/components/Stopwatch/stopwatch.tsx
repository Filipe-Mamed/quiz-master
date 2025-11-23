import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Text } from "@chakra-ui/react";
import { type I_UserResponse } from "@/shared/types/iUserResponse";

// Componente Stopwatch (cronômetro) com redirecionamento automático ao final da contagem
export const Stopwatch = ({
  userResponse,
}: {
  userResponse: I_UserResponse[];
}) => {
  // Estado para controlar o tempo restante (em segundos)
  const [time, setTime] = useState(300);

  const navigate = useNavigate();

  // Efeito que inicia o cronômetro ao montar o componente
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        // Quando o tempo acabar, limpa o intervalo e redireciona para a página de resultado,
        // passando os dados das respostas
        if (prev === 1) {
          clearInterval(interval);
          navigate("/resultado", { replace: true, state: { userResponse } });
        }
        return prev - 1; // Reduz o tempo a cada segundo
      });
    }, 1000); // Intervalo de 1 segundo

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(interval);
  }, [navigate, userResponse]);

  // Função para formatar o tempo no formato MM:SS
  const formatTime = (num: number) => {
    const minutes = Math.floor(num / 60);
    const seconds = num % 60;
    const formatted =
      minutes.toString().padStart(2, "0") +
      ":" +
      seconds.toString().padStart(2, "0");
    return formatted;
  };

  return (
    <>
      {/* Exibe o tempo formatado */}
      <Text>{formatTime(time)}</Text>
    </>
  );
};
