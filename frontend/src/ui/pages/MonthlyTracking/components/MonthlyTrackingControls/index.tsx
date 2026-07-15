import Button from "@/ui/components/Button";
import Select from "@/ui/components/Select";
import type { MonthlyTrackingControlsProps } from "./types";

const MonthlyTrackingControls = ({
  selectedPeriod,
  periodOptions,
  onPeriodChange,
  onNewRecord,
}: MonthlyTrackingControlsProps) => {
  return (
    <section className="flex items-end justify-between gap-4">
      <div className="w-fit">
        <Select
          id="monthly-tracking-period"
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

      <Button onClick={onNewRecord}>Add record</Button>
    </section>
  );
};

export default MonthlyTrackingControls;
