import { createPortal } from "react-dom";

import type { TooltipProps } from "./types";
import useTooltip from "./hooks/useTooltip";

const Tooltip = ({ text, children, disabled = false }: TooltipProps) => {
  const { position, handleMouseEnter, handleMouseLeave } = useTooltip(disabled);

  return (
    <>
      <div
        className="inline-flex min-w-0 max-w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      {position &&
        createPortal(
          <div
            className="pointer-events-none fixed z-50 max-w-xs -translate-x-1/2 -translate-y-full rounded-xl border border-text-secondary/20 bg-surface px-3 py-2 text-left text-xs leading-5 text-text-primary opacity-100 shadow-xl"
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            {text}

            <div className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 border-r border-b border-text-secondary/20 bg-surface" />
          </div>,
          document.body,
        )}
    </>
  );
};

export default Tooltip;
