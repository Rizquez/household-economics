import { useState } from "react";

type FieldError<TField extends string> = {
  field: TField;
  message: string;
};

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
