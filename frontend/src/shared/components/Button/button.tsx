import React from "react";

import { Button as ChakraButton, type ButtonProps } from "@chakra-ui/react";

interface I_CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
}

/**
 * Componente "Button" que é customizado via 'ButtonProps'
 */
export const Button = ({ children, ...rest }: I_CustomButtonProps) => {
  return <ChakraButton {...rest}>{children}</ChakraButton>;
};
