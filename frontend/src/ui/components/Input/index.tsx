import type { InputProps } from "./types";

const Input = ({
  label,
  error,
  className = "",
  id,
  disabled,
  ...props
}: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-primary">
          {label}
        </label>
      )}

      <input
        id={id}
        disabled={disabled}
        className={`
          h-10 rounded-xl border px-3 text-sm outline-none transition-colors
          ${
            disabled
              ? "cursor-not-allowed border-text-secondary/10 bg-background text-text-secondary opacity-60"
              : `bg-surface text-text-primary focus:border-primary ${
                  error ? "border-error" : "border-text-secondary/20"
                }`
          }
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

export default Input;
