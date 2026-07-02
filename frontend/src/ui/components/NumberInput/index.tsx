import Input from "@/ui/components/Input";
import type { NumberInputProps } from "./types";

const NumberInput = ({ className = "", ...props }: NumberInputProps) => {
  return (
    <Input
      {...props}
      type="number"
      className={`
        text-right
        [appearance:textfield]
        [&::-webkit-inner-spin-button]:appearance-none
        [&::-webkit-outer-spin-button]:appearance-none
        ${className}
      `}
    />
  );
};

export default NumberInput;