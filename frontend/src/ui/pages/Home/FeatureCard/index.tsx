import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FeatureCardProps } from "./types";

const FeatureCard = ({
  icon,
  title,
  description,
}: FeatureCardProps) => (
  <article className="flex gap-4 rounded-xl bg-surface p-5 shadow-sm">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <FontAwesomeIcon icon={icon} />
    </div>

    <div>
      <h2 className="font-semibold text-text-primary">{title}</h2>
      <p className="mt-1 text-sm leading-6 text-text-secondary">
        {description}
      </p>
    </div>
  </article>
);

export default FeatureCard