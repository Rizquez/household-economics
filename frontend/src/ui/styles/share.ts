export const chartTooltipStyles = {
  contentStyle: {
    backgroundColor: "var(--color-chart-tooltip-background)",
    border: "1px solid var(--color-chart-tooltip-border)",
    borderRadius: "0.75rem",
    color: "var(--color-text-primary)",
    boxShadow: "0 8px 24px rgb(0 0 0 / 0.15)",
  },
  itemStyle: {
    color: "var(--color-text-primary)",
  },
  labelStyle: {
    color: "var(--color-text-secondary)",
  },
} as const;
