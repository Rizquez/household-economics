import type { InputProps } from "./types";

const Input = ({ label, error, className = "", id, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-primary">
          {label}
        </label>
      )}

      <input
        id={id}
        className={`h-10 rounded-xl border bg-surface px-3 text-sm text-text-primary outline-none focus:border-primary ${error ? "border-error" : "border-text-secondary/20"} ${className}`}
        {...props}
      />

      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  );
};

export default Input;
