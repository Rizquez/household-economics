import type { SelectHTMLAttributes } from "react";

type SelectOption = {
  label: string;
  value: string | number;
};

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
};