import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "@/pages/Home/home";
import { Quiz } from "@/pages/Quiz/quiz";
import { Result } from "@/pages/Result/result";
import { ProtectRoute } from "@/shared/components/ProtectRoute";
import { PageNotFound } from "@/shared/components/PageNotFound";

/**
 * Configuração das rotas principais da aplicação.
 */
export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Rota inicial — página Home */}
        <Route path="/" element={<Home />} />

        {/*
          Rota do Quiz.
          Protegida por <ProtectRoute>, garantindo que o usuário só possa acessar
          se o estado "isPlaying" estiver ativo no contexto global.
        */}
        <Route
          path="/quiz"
          element={
            <ProtectRoute>
              <Quiz />
            </ProtectRoute>
          }
        />

        {/*
          Rota de Resultado.
          Também protegida: o usuário só acessa após o quiz ter sido iniciado.
        */}
        <Route
          path="/resultado"
          element={
            <ProtectRoute>
              <Result />
            </ProtectRoute>
          }
        />

        {/*
          Rota coringa.
          Qualquer URL inválida redireciona para a Home.
        */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};
