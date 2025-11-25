import { useContext } from "react";

import { GameContext } from "@/shared/contexts/gameContext";

/**
 * Hook personalizado para acessar o estado global do jogo.
 *
 * Este hook retorna o valor disponibilizado pelo <GameProvider>, contendo:
 * {
 *   isPlaying: boolean;
 *   setIsPlaying: (val: boolean) => void;
 * }
 *
 * Observações:
 * - O contexto pode ser undefined caso o hook seja utilizado fora do GameProvider.
 * - Para evitar comportamentos inesperados, este hook valida a existência do contexto
 *   e lança um erro descritivo caso não esteja dentro de um provider válido.
 *
 * Exemplo de uso:
 * const { isPlaying, setIsPlaying } = useGame();
 */
export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame deve ser usado dentro de um <GameProvider>");
  }

  return context;
};
