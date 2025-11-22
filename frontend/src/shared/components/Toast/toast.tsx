import { toaster } from "@/components/ui/toaster";

type ToastType = "success" | "error" | "warning" | "info" | "loading";

interface ShowToastProps {
  title: string;
  type: ToastType;
  description?: string;
  duration?: number;
}

/**
 * Componente Toast
 */
export const Toast = ({
  title,
  type,
  description,
  duration = 4000,
}: ShowToastProps) => {
  toaster.create({
    title,
    type,
    description,
    duration,
  });
};
