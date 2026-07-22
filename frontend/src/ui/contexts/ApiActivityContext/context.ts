import { createContext } from "react";
import type { ApiActivityContextValue } from "./types";

export const ApiActivityContext = createContext<ApiActivityContextValue | null>(null);
