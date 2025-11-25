import { createContext } from "react";

/**
 * Tipagem do contexto do jogo.
 * - isPlaying: indica se o jogo/atividade está em execução.
 * - setIsPlaying: função que atualiza o estado isPlaying (recebe um boolean).
 */
interface GameContextProps {
  isPlaying: boolean;
  setIsPlaying: (val: boolean) => void;
}

/**
 * Contexto global do jogo.
 *
 * Observações:
 * - O createContext é inicializado com `undefined` para garantir que o contexto
 *   só seja acessado quando devidamente fornecido pelo GameProvider.
 * - Essa abordagem evita o uso acidental do contexto fora do Provider e permite
 *   que TypeScript identifique possíveis acessos inválidos.
 * - Utilize o hook personalizado `useGame()` para consumir este contexto, pois
 *   ele realiza a validação e lança um erro claro caso o Provider não esteja presente.
 */
export const GameContext = createContext<GameContextProps | undefined>(
  undefined
);
