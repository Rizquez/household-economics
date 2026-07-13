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
    <section className="flex items-end justify-between">
      <div className="w-fit">
        <Select
          id="annual-budget-year"
          label="Filter budgets by year"
          className="text-right"
          value={year}
          placeholder={yearOptions.length ? undefined : "No periods available"}
          disabled={!yearOptions.length}
          options={yearOptions}
          onChange={(event) => onYearChange(event.target.value)}
        />
      </div>

      <div className="flex flex-col items-end gap-2">
      <Button disabled={!hasBudgetGroups || isUpdatingBudgets} onClick={onSaveBudgets}>
        {isUpdatingBudgets ? "Saving..." : "Save changes"}
      </Button>
      {formError && (
      <p className="text-sm text-error">
        {formError}
      </p>
    )}
    </div>
    </section>
  );
};

export default AnnualBudgetControls;
