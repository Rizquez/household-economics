import { useState, type ComponentProps } from "react";
import useCreateCategory from "@/ui/pages/Categories/hooks/useCreateCategory";

const useCreateCategoryForm = () => {
  const [category, setCategory] = useState("");
  const [recordTypeId, setRecordTypeId] = useState("");
  const [formError, setFormError] = useState("");

  const { mutate, isPending, error } = useCreateCategory();

  const handleSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
    event.preventDefault();

    if (!category && !recordTypeId) {
      setFormError("Please enter a category and select a record type.");
      return;
    }

    if (!category) {
      setFormError("Please enter a category.");
      return;
    }

    if (!recordTypeId) {
      setFormError("Please select a record type.");
      return;
    }

    setFormError("");

    mutate(
      {
        name: category,
        recordTypeId: Number(recordTypeId),
      },
      {
        onSuccess: () => {
          setCategory("");
          setRecordTypeId("");
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
    setCategory,
    setRecordTypeId,
    setFormError,
  };
};

export default useCreateCategoryForm;