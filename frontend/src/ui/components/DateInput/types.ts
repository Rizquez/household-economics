export type DateInputProps = {
  id: string;
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};
