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
      className="flex w-full flex-col gap-2 xl:w-auto"
    >
      <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:gap-4">
        <div className="w-full lg:w-auto">
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
        </div>

        <div className="w-full lg:w-auto">
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

        <Button type="submit" className="w-full lg:w-auto" disabled={isPending}>
          {isPending ? "Creating..." : "Create"}
        </Button>
      </div>

      {(formError || error) && (
        <div className="min-w-0 wrap-break-word text-sm text-error">
          {formError && <p>{formError}</p>}
          {error && <p>{error.message}</p>}
        </div>
      )}
    </form>
  );
};

export default CreateCategoryForm;
