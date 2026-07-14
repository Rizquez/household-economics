import type { SelectProps } from "./types";

const Select = ({
  label,
  error,
  options,
  placeholder,
  className = "",
  id,
  disabled = false,
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
        disabled={disabled}
        className={`
          h-10 appearance-none rounded-xl border px-3 text-sm outline-none transition-colors
          ${
            disabled
              ? "cursor-not-allowed border-text-secondary/10 bg-background text-text-secondary opacity-60"
              : `cursor-pointer bg-surface text-text-primary focus:border-primary ${
                  error ? "border-error" : "border-text-secondary/20"
                }`
          }
          ${className}
        `}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
