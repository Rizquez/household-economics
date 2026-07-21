import Button from "@/ui/components/Button";
import Input from "@/ui/components/Input";
import Select from "@/ui/components/Select";

import type { FamilyInformationProps } from "./types";
import useFamilyInformation from "./hook/useFamilyInformation";

const FamilyInformation = ({
  family,
  currencyTypes,
}: FamilyInformationProps) => {
  const {
    name,
    currencyTypeId,
    formError,
    isPending,
    error,
    handleSubmit,
    hasFieldError,
    clearFieldError,
    setName,
    setCurrencyTypeId,
  } = useFamilyInformation(family.name, family.currencyTypeId);

  return (
    <section className="rounded-xl border border-text-secondary/10 bg-background p-6">
      <header className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-text-primary">
          Family information
        </h2>

        <p className="text-sm text-text-secondary">
          Manages direct information about the family unit.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="relative mt-6 flex items-end gap-3"
      >
        <div className="w-full max-w-md">
          <Input
            id="family-name"
            label="Name"
            placeholder="Family valid name..."
            value={name}
            error={hasFieldError("name")}
            disabled={isPending}
            onChange={(event) => {
              setName(event.target.value);
              clearFieldError("name");
            }}
          />
        </div>

        <div className="w-full max-w-3xs">
          <Select
            id="family-currency"
            label="Currency"
            value={currencyTypeId}
            error={hasFieldError("currencyType")}
            disabled={isPending}
            onChange={(value) => {
              setCurrencyTypeId(String(value));
              clearFieldError("currencyType");
            }}
            options={currencyTypes.map((currencyType) => ({
              label: `${currencyType.name} (${currencyType.symbol})`,
              value: currencyType.id,
            }))}
          />
        </div>

        <Button type="submit" className="h-10 shrink-0" disabled={isPending}>
          {isPending ? "Saving..." : "Save"}
        </Button>

        {(formError || error) && (
          <div className="absolute left-0 top-full mt-2 text-sm text-error">
            {formError && <p>{formError}</p>}
            {error && <p>{error.message}</p>}
          </div>
        )}
      </form>
    </section>
  );
};

export default FamilyInformation;
