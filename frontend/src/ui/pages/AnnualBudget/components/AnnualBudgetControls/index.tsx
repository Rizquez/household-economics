import Button from "@/ui/components/Button";
import Select from "@/ui/components/Select";
import type { AnnualBudgetControlsProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

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

      <div className="relative w-fit">
        <Select
          id="annual-budget-year"
          className="pl-10 text-right"
          value={year}
          placeholder={yearOptions.length ? undefined : "No periods available"}
          disabled={!yearOptions.length}
          options={yearOptions}
          onChange={(event) => onYearChange(event.target.value)}
        />

        <FontAwesomeIcon
          icon={faChevronDown}
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-primary"
        />
      </div>
    </section>
  );
};

export default AnnualBudgetControls;
