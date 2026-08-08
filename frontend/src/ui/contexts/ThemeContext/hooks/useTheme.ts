import { useContext } from "react";
import ApplicationError from "@/core/errors";
import { ThemeContext } from "../context";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new ApplicationError("useTheme must be used inside ThemeProvider");
  }

  return context;
};
