import type { ButtonHTMLAttributes, ReactNode } from "react";

export type SelectValue = string | number;

export type SelectOption = {
  label: string;
  value: SelectValue;
  disabled?: boolean;
  icon?: ReactNode;
};

export type SelectProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "value" | "defaultValue" | "onChange" | "name"
> & {
  label?: string;
  error?: boolean;
  errorMessage?: string;
  options: SelectOption[];
  placeholder?: string;
  value?: SelectValue;
  onChange: (value: SelectValue) => void;
  name?: string;
};
