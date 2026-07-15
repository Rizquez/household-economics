import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendDown,
  faArrowTrendUp,
  faCoins,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

import type { DashboardOverviewProps } from "./types";

const DashboardOverview = ({ overview }: DashboardOverviewProps) => {
  const cards = [
    {
      label: "Income",
      value: overview.income,
      icon: faArrowTrendUp,
      valueClassName: "text-success",
    },
    {
      label: "Expenses",
      value: overview.expenses,
      icon: faArrowTrendDown,
      valueClassName: "text-error",
    },
    {
      label: "Available",
      value: overview.available,
      icon: faWallet,
      valueClassName: overview.available >= 0 ? "text-success" : "text-error",
    },
    {
      label: "Remaining",
      value: overview.remaining,
      icon: faCoins,
      valueClassName: overview.remaining >= 0 ? "text-success" : "text-error",
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.label}
          className="flex items-center justify-between gap-4 rounded-xl border border-text-secondary/10 bg-background p-5"
        >
          <div className="flex min-w-0 flex-col gap-2">
            <span className="text-sm text-text-secondary">{card.label}</span>

            <span
              className={`truncate text-2xl font-semibold ${card.valueClassName}`}
              title={card.value.toFixed(2)}
            >
              {card.value.toFixed(2)}
            </span>
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-lg text-primary">
            <FontAwesomeIcon icon={card.icon} />
          </div>
        </article>
      ))}
    </section>
  );
};

export default DashboardOverview;
