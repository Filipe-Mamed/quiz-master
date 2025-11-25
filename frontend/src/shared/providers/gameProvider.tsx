import React, { useState } from "react";

import { GameContext } from "@/shared/contexts/gameContext";

/**
 * Provider do contexto de jogo.
 *
 * Responsável por manter o estado global relacionado ao "modo de jogo" (isPlaying)
 * e expor a função setIsPlaying para permitir que componentes filhos iniciem/paralisem o jogo.
 *
 * Props:
 * - children: árvore de componentes que poderão consumir o GameContext.
 */
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  // Estado local que indica se o jogo/atividade está em execução.
  // Valor inicial: false (não está jogando).
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    // Provê o contexto com o estado e a função de atualização para todos os filhos.
    // Exemplo de consumo em um componente filho:
    <GameContext.Provider value={{ isPlaying, setIsPlaying }}>
      {children}
    </GameContext.Provider>
  );
};
