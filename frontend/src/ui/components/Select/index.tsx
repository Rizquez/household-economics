import type { SelectProps } from "./types";

const Select = ({
  label,
  error,
  options,
  placeholder,
  className = "",
  id,
  ...props
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-primary">
          {label}
        </label>
      )}

      <select
        id={id}
        className={`appearance-none h-10 rounded-xl border bg-surface px-3 text-sm text-text-primary outline-none focus:border-primary ${error ? "border-error" : "border-text-secondary/20"} ${className}`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  );
};

export default Select;