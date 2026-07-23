import { format, parseISO } from "date-fns";

export const toDate = (value: string): Date | undefined => {
  if (!value) return undefined;

  const date = parseISO(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

export const toIsoDate = (date: Date): string => format(date, "yyyy-MM-dd");
