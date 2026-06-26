import { useState, type FormEvent } from "react";
import useRecordTypes from "../../hooks/useRecordTypes";
import useCreateCategory from "../../hooks/useCreateCategory";
import Input from "@/ui/components/Input";
import Select from "@/ui/components/Select";
import Button from "@/ui/components/Button";



const CreateCategoryForm = () => {
  const [category, setCategory] = useState("");
  const [recordTypeId, setRecordTypeId] = useState("");

  const { recordTypes, isPending: isLoadingRecordTypes } = useRecordTypes();
  const { mutate, isPending, error } = useCreateCategory();

  const [formError, setFormError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  if (!category && !recordTypeId) {
    setFormError("Please enter a category and select a record type.")
    return
  }

  if (!category) {
    setFormError("Please enter a category.")
    return
  }

  if (!recordTypeId) {
    setFormError("Please select a record type.");
    return;
  }

  setFormError("");

  mutate(
    {
      category,
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
        onChange={(event) => setCategory(event.target.value)}
        error ={(formError && !category) ? true : false}
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
  disabled={isLoadingRecordTypes}
  options={recordTypes.map((recordType) => ({
    label: recordType.recordType,
    value: recordType.id,
  }))}
  error= {(formError && !recordTypeId) ? true : false}
/>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create"}
      </Button>

      {formError && (
  <p className="w-full text-sm text-error">{formError}</p>
)}

      {error && <p className="w-full text-sm text-error">{error.message}</p>}
    </form>
  );
};

export default CreateCategoryForm;