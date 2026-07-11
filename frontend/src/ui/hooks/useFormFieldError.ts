import { useState } from "react";
import type { FieldError } from "./types";

const useFormFieldError = <TField extends string>() => {
  const [error, setError] = useState<FieldError<TField> | null>(null);

  const showFieldError = (field: TField, message: string) => {
    setError({ field, message });
  };

  const clearFieldError = (field: TField) => {
    setError((currentError) =>
      currentError?.field === field ? null : currentError,
    );
  };

  const clearFormError = () => {
    setError(null);
  };

  const hasFieldError = (field: TField) => error?.field === field;

  return {
    errorMessage: error?.message ?? "",
    showFieldError,
    clearFieldError,
    clearFormError,
    hasFieldError,
  };
};

export default useFormFieldError;
