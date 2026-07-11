import {
  faChartPie,
  faChartLine,
  faWallet,
  faPiggyBank,
  faTags,
  faGear,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

export const paths = {
  home: {
    href: "/",
    title: "Household Economics",
  },
  dashboard: {
    href: "/dashboard",
    title: "Dashboard (TODO)",
    label: "Dashboard (TODO)",
    icon: faChartPie,
  },
  annualbudget: {
    href: "/annual-budget",
    title: "Annual budget",
    label: "Annual budget",
    icon: faWallet,
  },
  monthlytracking: {
    href: "/monthly-tracking",
    title: "Monthly tracking",
    label: "Monthly tracking",
    icon: faChartLine,
  },
  savingsinvestments: {
    href: "/savings-and-investments",
    title: "Savings and investments",
    label: "Savings and investments",
    icon: faPiggyBank,
  },
  categories: {
    href: "/categories",
    title: "Categories",
    label: "Categories",
    icon: faTags,
  },
  configuration: {
    href: "/configuration",
    title: "Configuration (TODO)",
    label: "Configuration (TODO)",
    icon: faGear,
  },
  privacypolicy: {
    href: "/privacy-policy",
    title: "Privacy policy",
    label: "Privacy policy",
    icon: faArrowUpRightFromSquare,
  },
} as const;
