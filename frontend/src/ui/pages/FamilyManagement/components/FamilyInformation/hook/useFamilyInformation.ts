import { useState, type ComponentProps } from "react";

import useFormFieldError from "@/ui/hooks/useFormFieldError";
import type {
  FamilyInformationErrorField,
  FamilyInformationValidationError,
} from "../types";
import useUpdateFamilyInformation from "./useUpdateFamilyInformation";

const useFamilyInformation = (initialName: string) => {
  const [name, setName] = useState(initialName);

  const {
    errorMessage: formError,
    showFieldError,
    clearFieldError,
    clearFormError,
    hasFieldError,
  } = useFormFieldError<FamilyInformationErrorField>();

  const { mutate, isPending, error } = useUpdateFamilyInformation();

  const validate = (): FamilyInformationValidationError | null => {
    if (!name.trim()) {
      return {
        field: "name",
        message: "Please enter a family name.",
      };
    }

    if (name.trim().length > 15) {
      return {
        field: "name",
        message: "Family name cannot contain more than 15 characters.",
      };
    }

    if (name.trim().length < 5) {
      return {
        field: "name",
        message: "Family name cannot contain less than 5 characters.",
      };
    }

    return null;
  };

  const handleSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();

    const validationError = validate();

    if (validationError) {
      showFieldError(validationError.field, validationError.message);

      return;
    }

    clearFormError();

    mutate(
      {
        name: name.trim(),
      },
      {
        onSuccess: (_, payload) => {
          setName(payload.name);
          clearFormError();
        },
      },
    );
  };

  return {
    name,
    formError,
    isPending,
    error,
    handleSubmit,
    hasFieldError,
    clearFieldError,
    setName,
  };
};

export default useFamilyInformation;
