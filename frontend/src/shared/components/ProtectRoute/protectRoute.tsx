import type React from "react";
import { Navigate } from "react-router-dom";

import { useGame } from "@/shared/hooks/useGame";

interface ProtectRouteProps {
  // Elementos filhos (componentes) que serão renderizados caso a rota seja permitida
  children: React.ReactNode;
}

export const ProtectRoute = ({ children }: ProtectRouteProps) => {
  // Hook responsável por indicar se o usuário está em jogo ou não
  const { isPlaying } = useGame();

  // Se o usuário tentar acessar rotas sem estar jogando,
  // ele é redirecionado automaticamente para a página inicial
  if (!isPlaying) {
    {
      /* Redireciona o usuário para a rota "/" caso ele não esteja em jogo */
    }
    return <Navigate to="/" replace />;
  }

  {
    /* Renderiza a rota protegida */
  }
  return children;
};
