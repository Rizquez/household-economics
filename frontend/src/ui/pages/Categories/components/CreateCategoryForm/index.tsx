import Input from "@/ui/components/Input";
import Select from "@/ui/components/Select";
import Button from "@/ui/components/Button";
import type { CreateCategoryFormProps } from "./types";
import useCreateCategoryForm from "./hooks/useCreateCategoryForm";

const CreateCategoryForm = ({ recordTypes }: CreateCategoryFormProps) => {
  const {
    category,
    recordTypeId,
    formError,
    isPending,
    error,
    handleSubmit,
    setCategory,
    setRecordTypeId,
    setFormError,
  } = useCreateCategoryForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
      <Input
        id="category"
        label="New category"
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