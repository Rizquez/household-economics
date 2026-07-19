import Select from "@/ui/components/Select";

import type { DashboardControlsProps } from "./types";

const DashboardControls = ({
  selectedPeriod,
  periodOptions,
  onPeriodChange,
}: DashboardControlsProps) => {
  return (
    <section className="flex items-center gap-4">
      <div className="w-fit">
        <Select
          id="dashboard-period"
          className="pl-10 text-right"
          value={selectedPeriod}
          placeholder={
            periodOptions.length ? undefined : "No periods available"
          }
          disabled={!periodOptions.length}
          options={periodOptions}
          onChange={(value) => onPeriodChange(String(value))}
        />
      </div>
    </section>
  );
};

export default DashboardControls;
