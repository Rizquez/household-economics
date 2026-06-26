import type { ButtonProps } from "./types";

const variants = {
  primary: "bg-primary text-surface hover:opacity-90",
  danger: "bg-error text-surface hover:opacity-90",
};

const Button = ({
  children,
  variant = "primary",
  className = "",
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`rounded-xl px-4 py-2 text-sm cursor-pointer ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;