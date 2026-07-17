import Select from "@/ui/components/Select";

import type { DashboardControlsProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const DashboardControls = ({
  selectedPeriod,
  periodOptions,
  onPeriodChange,
}: DashboardControlsProps) => {
  return (
    <section className="flex items-center gap-4">
      <div className="relative w-fit">
        <Select
          id="dashboard-period"
          className="pl-10 text-right"
          value={selectedPeriod}
          placeholder={
            periodOptions.length ? undefined : "No periods available"
          }
          disabled={!periodOptions.length}
          options={periodOptions}
          onChange={(event) => onPeriodChange(event.target.value)}
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

export default DashboardControls;
