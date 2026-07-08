import {
  faChartPie,
  faCalendarDays,
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
  dailyregister: {
    href: "/daily-register",
    title: "Daily register (WIP)",
    label: "Daily register (WIP)",
    icon: faCalendarDays,
  },
  annualbudget: {
    href: "/annual-budget",
    title: "Annual budget",
    label: "Annual budget",
    icon: faWallet,
  },
  monthlytracking: {
    href: "/expense-tracking",
    title: "Expense tracking (TODO)",
    label: "Expense tracking (TODO)",
    icon: faChartLine,
  },
  savingsinvestments: {
    href: "/savings-and-investments",
    title: "Savings and investments (TODO)",
    label: "Savings and investments (TODO)",
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
