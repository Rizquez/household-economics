import { useState, type ComponentProps } from "react";

import useFormFieldError from "@/ui/hooks/useFormFieldError";

import useCreateFamilyInvitation from "./useCreateFamilyInvitation";
import type {
  FamilyInvitationErrorField,
  FamilyInvitationValidationError,
} from "./types";

const useFamilyInvitationForm = () => {
  const [email, setEmail] = useState("");

  const {
    errorMessage: formError,
    showFieldError,
    clearFieldError,
    clearFormError,
    hasFieldError,
  } = useFormFieldError<FamilyInvitationErrorField>();

  const { mutate, isPending, error } = useCreateFamilyInvitation();

  const validate = (): FamilyInvitationValidationError | null => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      return {
        field: "email",
        message: "Please enter an email address.",
      };
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      return {
        field: "email",
        message: "Please enter a valid email address.",
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
        email: email.trim().toLowerCase(),
      },
      {
        onSuccess: () => {
          setEmail("");
          clearFormError();
        },
      },
    );
  };

  return {
    email,
    formError,
    isPending,
    error,
    handleSubmit,
    hasFieldError,
    clearFieldError,
    setEmail,
  };
};

export default useFamilyInvitationForm;
