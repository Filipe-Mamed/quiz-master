import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

import { Tooltip } from "@/components/ui/tooltip";

/**
 * Componente GitHub que leva pro repositório do projeto
 */
export const GitHub = () => {
  return (
    <Tooltip
      showArrow
      content="Ir para o repositório GitHub"
      positioning={{ placement: "top" }}
    >
      <Link to="https://github.com/Filipe-Mamed">
        <FaGithub />
      </Link>
    </Tooltip>
  );
};
