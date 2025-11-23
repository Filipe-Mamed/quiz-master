import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "@/pages/Home/home";
import { Quiz } from "@/pages/Quiz/quiz";
import { Result } from "@/pages/Result/result";

/**
 * Rotas
 */
export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/resultado" element={<Result />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};
