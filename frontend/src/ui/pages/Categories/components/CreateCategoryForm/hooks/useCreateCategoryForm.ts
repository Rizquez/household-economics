import { useState, type ComponentProps } from "react";
import useFormFieldError from "@/ui/hooks/useFormFieldError";
import useCreateCategory from "@/ui/pages/Categories/components/CreateCategoryForm/hooks/useCreateCategory";
import type {
  CreateCategoryErrorField,
  CreateCategoryValidationError,
} from "./types";

const useCreateCategoryForm = () => {
  const [category, setCategory] = useState("");
  const [recordTypeId, setRecordTypeId] = useState("");

  const {
    errorMessage: formError,
    showFieldError,
    clearFieldError,
    clearFormError,
    hasFieldError,
  } = useFormFieldError<CreateCategoryErrorField>();

  const { mutate, isPending, error } = useCreateCategory();

  const validate = (): CreateCategoryValidationError | null => {
    if (!category.trim()) {
      return {
        field: "category",
        message: "Please enter a category.",
      };
    }

    if (category.trim().length > 50) {
      return {
        field: "category",
        message: "Category cannot contain more than 50 characters.",
      };
    }

    if (!recordTypeId) {
      return {
        field: "recordType",
        message: "Please select a record type.",
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
        name: category.trim(),
        recordTypeId: Number(recordTypeId),
      },
      {
        onSuccess: () => {
          setCategory("");
          setRecordTypeId("");
          clearFormError();
        },
      },
    );
  };

  return {
    category,
    recordTypeId,
    formError,
    isPending,
    error,
    handleSubmit,
    hasFieldError,
    clearFieldError,
    setCategory,
    setRecordTypeId,
  };
};

export default useCreateCategoryForm;
