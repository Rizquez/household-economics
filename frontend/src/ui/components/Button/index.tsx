import type { ButtonProps } from "./types";

const VARIANTS = {
  primary: "bg-primary text-surface",
  secondary: "bg-secondary text-surface",
  danger: "bg-error text-surface",
  background: "bg-background text-text-primary",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  textSize = "text-sm",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        rounded-xl px-4 py-2 transition-opacity
        ${textSize}
        ${VARIANTS[variant]}
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
