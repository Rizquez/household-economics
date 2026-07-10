import { useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

import Button from "@/ui/components/Button";
import type { DateInputProps } from "./types";

const toDate = (value: string): Date | undefined => {
  if (!value) return undefined;

  const date = parseISO(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

const toIsoDate = (date: Date): string => format(date, "yyyy-MM-dd");

const DateInput = ({
  id,
  label,
  value,
  onChange,
  error,
  placeholder = "Select date",
  className = "",
  disabled = false,
}: DateInputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedDate = useMemo(() => toDate(value), [value]);

  return (
    <div className="relative flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-primary">
          {label}
        </label>
      )}

      <button
        id={id}
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((current) => !current)}
        className={`h-10 rounded-xl border bg-surface px-3 text-left text-sm text-text-primary outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60 ${error ? "border-error" : "border-text-secondary/20"} ${className}`}
      >
        {selectedDate ? format(selectedDate, "MMM dd, yyyy", { locale: enUS }) : (
          <span className="text-text-secondary">{placeholder}</span>
        )}
      </button>

      {isOpen && !disabled && (
        <div className="absolute top-17 z-50 rounded-xl border border-text-secondary/10 bg-surface p-3 shadow-xl">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (!date) return;

              onChange(toIsoDate(date));
              setIsOpen(false);
            }}
            locale={enUS}
            classNames={{
              month_caption:
                "mb-3 flex items-center justify-center text-sm font-semibold text-text-primary",
              nav: "absolute left-3 right-3 top-3 flex items-center justify-between",
              button_previous:
                "rounded-lg px-2 py-1 text-sm text-text-primary hover:bg-background",
              button_next:
                "rounded-lg px-2 py-1 text-sm text-text-primary hover:bg-background",
              weekdays: "grid grid-cols-7 text-xs text-text-secondary",
              weekday: "flex h-8 items-center justify-center",
              week: "grid grid-cols-7",
              day: "flex h-9 w-9 items-center justify-center text-sm text-text-primary",
              day_button:
                "h-9 w-9 rounded-lg hover:bg-background aria-selected:bg-primary aria-selected:text-surface",
              outside: "text-text-secondary/40",
              today: "font-semibold",
            }}
          />

          <div className="mt-3 flex justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateInput;