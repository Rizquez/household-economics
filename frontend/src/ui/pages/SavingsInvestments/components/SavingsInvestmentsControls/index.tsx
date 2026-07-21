import Select from "@/ui/components/Select";

import type { SavingsInvestmentsControlsProps } from "./types";

const SavingsInvestmentsControls = ({
  selectedPeriod,
  periodOptions,
  onPeriodChange,
}: SavingsInvestmentsControlsProps) => {
  return (
    <section>
      <Select
        id="savings-investments-period"
        className="pl-10 text-right"
        value={selectedPeriod}
        placeholder={periodOptions.length ? undefined : "No periods available"}
        disabled={!periodOptions.length}
        options={periodOptions}
        onChange={(value) => onPeriodChange(String(value))}
      />
    </section>
  );
};

export default SavingsInvestmentsControls;
