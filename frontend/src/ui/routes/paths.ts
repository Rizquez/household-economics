import {
  faChartPie,
  faChartLine,
  faWallet,
  faPiggyBank,
  faTags,
  faPeopleRoof,
  faArrowUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

export const paths = {
  home: {
    href: "/",
    title: "Household Economics",
  },
  dashboard: {
    href: "/dashboard",
    title: "Dashboard",
    label: "Dashboard",
    icon: faChartPie,
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
  annualbudget: {
    href: "/annual-budget",
    title: "Annual budget",
    label: "Annual budget",
    icon: faWallet,
  },
  categories: {
    href: "/categories",
    title: "Categories",
    label: "Categories",
    icon: faTags,
  },
  familymanagement: {
    href: "/family-management",
    title: "Family management",
    label: "Family management",
    icon: faPeopleRoof,
  },
  privacypolicy: {
    href: "/privacy-policy",
    title: "Privacy policy",
    label: "Privacy policy",
    icon: faArrowUpRightFromSquare,
  },
} as const;
