import type React from "react";

import { Box, type BoxProps } from "@chakra-ui/react";

interface I_BoxProps extends BoxProps {
  children: React.ReactNode;
}

/**
 * Componente "Card" para aplicação
 */
export const Card = ({ children, ...rest }: I_BoxProps) => {
  return <Box {...rest}>{children}</Box>;
};
