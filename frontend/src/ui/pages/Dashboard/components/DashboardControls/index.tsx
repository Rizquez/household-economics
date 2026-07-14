import Select from "@/ui/components/Select";

import type { DashboardControlsProps } from "./types";

const DashboardControls = ({
  selectedPeriod,
  periodOptions,
  onPeriodChange,
}: DashboardControlsProps) => {
  return (
    <section className="flex items-end justify-between">
      <div className="w-fit">
        <Select
          id="dashboard-period"
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

export default DashboardControls;
