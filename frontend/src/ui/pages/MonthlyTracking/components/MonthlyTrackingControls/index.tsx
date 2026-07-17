import Button from "@/ui/components/Button";
import Select from "@/ui/components/Select";
import type { MonthlyTrackingControlsProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const MonthlyTrackingControls = ({
  selectedPeriod,
  periodOptions,
  onPeriodChange,
  onNewRecord,
}: MonthlyTrackingControlsProps) => {
  return (
    <section className="flex items-center gap-4">
      <Button onClick={onNewRecord}>Add record</Button>

      <div className="relative w-fit">
        <Select
          id="monthly-tracking-period"
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

export default MonthlyTrackingControls;
