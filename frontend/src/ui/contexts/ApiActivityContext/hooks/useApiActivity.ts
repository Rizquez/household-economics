import { useContext } from "react";
import ApplicationError from "@/core/errors";
import { ApiActivityContext } from "../context";

export const useApiActivity = () => {
  const context = useContext(ApiActivityContext);

  if (!context) {
    throw new ApplicationError(
      "useApiActivity must be used inside ApiActivityProvider",
    );
  }

  return context;
};
