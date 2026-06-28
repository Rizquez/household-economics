import { useState, type SubmitEvent } from "react";

import Input from "@/ui/components/Input";
import Select from "@/ui/components/Select";
import Button from "@/ui/components/Button";
import useCreateCategory from "../../hooks/useCreateCategory";
import type { CreateCategoryFormProps } from "./types";

const CreateCategoryForm = ({ recordTypes }: CreateCategoryFormProps) => {
  const [category, setCategory] = useState("");
  const [recordTypeId, setRecordTypeId] = useState("");
  const [formError, setFormError] = useState("");

  const { mutate, isPending, error } = useCreateCategory();

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
      <Input
        id="category"
        label="Category"
        placeholder="Food, Bills, Baby..."
        value={category}
        onChange={(event) => {
          setCategory(event.target.value);
          setFormError("");
        }}
        error={Boolean(formError && !category)}
      />

      <Select
        id="record-type"
        label="Record type"
        placeholder="Select a record type"
        value={recordTypeId}
        onChange={(event) => {
          setRecordTypeId(event.target.value);
          setFormError("");
        }}
        options={recordTypes.map((recordType) => ({
          label: recordType.name,
          value: recordType.id,
        }))}
        error={Boolean(formError && !recordTypeId)}
      />

      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create"}
      </Button>

      {formError && <p className="w-full text-sm text-error">{formError}</p>}

      {error && <p className="w-full text-sm text-error">{error.message}</p>}
    </form>
  );
};

export default CreateCategoryForm;
