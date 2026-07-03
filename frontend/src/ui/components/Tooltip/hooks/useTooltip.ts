import { useState, type MouseEvent } from "react";

const useTooltip = (disabled: boolean) => {
  const [position, setPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    const rect = event.currentTarget.getBoundingClientRect();

    setPosition({
      top: rect.top - 8,
      left: rect.left + rect.width / 2,
    });
  };

  const handleMouseLeave = () => {
    setPosition(null);
  };

  return {
    position,
    handleMouseEnter,
    handleMouseLeave,
  };
};

export default useTooltip;
