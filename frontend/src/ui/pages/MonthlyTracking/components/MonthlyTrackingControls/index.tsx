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
    <section className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:gap-4">
      <Button className="w-full lg:w-auto" onClick={onNewRecord}>
        Add record
      </Button>

      <div className="w-full lg:w-auto">
        <Select
          id="monthly-tracking-period"
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

export default MonthlyTrackingControls;
