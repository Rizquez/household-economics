import Button from "@/ui/components/Button";
import Select from "@/ui/components/Select";
import type { AnnualBudgetControlsProps } from "./types";

const AnnualBudgetControls = ({
  year,
  yearOptions,
  hasBudgetGroups,
  isUpdatingBudgets,
  formError,
  onYearChange,
  onSaveBudgets,
}: AnnualBudgetControlsProps) => {
  return (
    <section className="flex flex-col items-stretch gap-3 xl:flex-row xl:items-center xl:gap-4">
      <div className="flex min-w-0 w-full flex-col xl:w-auto">
        <Button
          className="w-full xl:w-auto"
          disabled={!hasBudgetGroups || isUpdatingBudgets}
          onClick={onSaveBudgets}
        >
          {isUpdatingBudgets ? "Saving..." : "Save budget"}
        </Button>

        {formError && (
          <p className="mt-1 wrap-break-word text-sm text-error">{formError}</p>
        )}
      </div>

      <div className="w-full xl:w-auto">
        <Select
          id="annual-budget-year"
          className="pl-10 text-right"
          value={year}
          placeholder={yearOptions.length ? undefined : "No periods available"}
          disabled={!yearOptions.length}
          options={yearOptions}
          onChange={(value) => onYearChange(String(value))}
        />
      </div>
    </section>
  );
};

export default AnnualBudgetControls;
