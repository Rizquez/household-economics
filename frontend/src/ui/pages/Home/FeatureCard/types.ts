import type { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type FeatureCardProps = {
  icon: React.ComponentProps<typeof FontAwesomeIcon>["icon"];
  title: string;
  description: string;
};
