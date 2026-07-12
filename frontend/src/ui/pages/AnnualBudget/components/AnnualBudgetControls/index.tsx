import Button from "@/ui/components/Button";
import Select from "@/ui/components/Select";
import type { AnnualBudgetControlsProps } from "./types";

const AnnualBudgetControls = ({
  year,
  yearOptions,
  hasBudgetGroups,
  isUpdatingBudgets,
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

      <Button disabled={!hasBudgetGroups || isUpdatingBudgets} onClick={onSaveBudgets}>
        {isUpdatingBudgets ? "Saving..." : "Save changes"}
      </Button>
    </section>
  );
};

export default AnnualBudgetControls;
