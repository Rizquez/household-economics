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
    <section className="flex items-center gap-4">
      <div className="flex flex-col">
        <Button
          disabled={!hasBudgetGroups || isUpdatingBudgets}
          onClick={onSaveBudgets}
        >
          {isUpdatingBudgets ? "Saving..." : "Save budget"}
        </Button>

        {formError && <p className="text-sm text-error">{formError}</p>}
      </div>

      <div>
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
