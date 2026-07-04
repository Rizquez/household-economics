import type { ReactNode } from "react";

export type TooltipProps = {
  text: string;
  children: ReactNode;
  disabled?: boolean;
};
