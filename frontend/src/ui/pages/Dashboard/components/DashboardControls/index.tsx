import Select from "@/ui/components/Select";

import type { DashboardControlsProps } from "./types";

const DashboardControls = ({
  selectedPeriod,
  periodOptions,
  onPeriodChange,
}: DashboardControlsProps) => {
  return (
    <section>
      <Select
        id="dashboard-period"
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

export default DashboardControls;
