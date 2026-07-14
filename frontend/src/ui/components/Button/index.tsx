import type { ButtonProps } from "./types";

const variants = {
  primary: "bg-primary text-surface",
  secondary: "bg-secondary text-surface",
  danger: "bg-error text-surface",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        rounded-xl px-4 py-2 text-sm transition-opacity
        ${variants[variant]}
        ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:opacity-90"
        }
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
