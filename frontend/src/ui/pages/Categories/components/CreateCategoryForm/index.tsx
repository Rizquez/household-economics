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
    hasFieldError,
    clearFieldError,
    setCategory,
    setRecordTypeId,
  } = useCreateCategoryForm();

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-4">
      <Input
        id="category"
        label="New category"
        placeholder="Food, Bills, Baby..."
        value={category}
        error={hasFieldError("category")}
        onChange={(event) => {
          setCategory(event.target.value);
          clearFieldError("category");
        }}
      />

      <Select
        id="record-type"
        label="Record type"
        placeholder="Select a record type"
        value={recordTypeId}
        error={hasFieldError("recordType")}
        onChange={(event) => {
          setRecordTypeId(event.target.value);
          clearFieldError("recordType");
        }}
        options={recordTypes.map((recordType) => ({
          label: recordType.name,
          value: recordType.id,
        }))}
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
