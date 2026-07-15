import Select from "@/ui/components/Select";

import type { SavingsInvestmentsControlsProps } from "./types";

const SavingsInvestmentsControls = ({
  selectedPeriod,
  periodOptions,
  onPeriodChange,
}: SavingsInvestmentsControlsProps) => {
  return (
    <section className="flex items-end justify-between gap-4">
      <div className="w-fit">
        <Select
          id="savings-investments-period"
          label="Filter by month and year"
          className="text-right"
          value={selectedPeriod}
          placeholder={
            periodOptions.length ? undefined : "No periods available"
          }
          disabled={!periodOptions.length}
          options={periodOptions}
          onChange={(event) => onPeriodChange(event.target.value)}
        />
      </div>
    </section>
  );
};

export default SavingsInvestmentsControls;
