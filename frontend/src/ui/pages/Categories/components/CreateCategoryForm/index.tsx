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
    <form
      onSubmit={handleSubmit}
      className="relative flex flex-wrap items-center gap-4"
    >
      <Input
        id="category"
        placeholder="Category name..."
        value={category}
        error={hasFieldError("category")}
        onChange={(event) => {
          setCategory(event.target.value);
          clearFieldError("category");
        }}
      />

      <div>
        <Select
          id="record-type"
          className="pl-10 text-right"
          placeholder="Record type"
          value={recordTypeId}
          error={hasFieldError("recordType")}
          onChange={(value) => {
            setRecordTypeId(String(value));
            clearFieldError("recordType");
          }}
          options={recordTypes.map((recordType) => ({
            label: recordType.name,
            value: recordType.id,
          }))}
        />
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create"}
      </Button>

      {(formError || error) && (
        <div className="absolute left-0 top-full mt-2 text-sm text-error">
          {formError && <p>{formError}</p>}
          {error && <p>{error.message}</p>}
        </div>
      )}
    </form>
  );
};

export default CreateCategoryForm;
