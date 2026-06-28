import {
  faChartPie,
  faCalendarDays,
  faChartLine,
  faWallet,
  faPiggyBank,
  faHeart,
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
    title: "Dashboard",
    label: "Dashboard",
    icon: faChartPie,
  },
  dailyregister: {
    href: "/daily-register",
    title: "Daily register",
    label: "Daily register",
    icon: faCalendarDays,
  },
  monthlybudget: {
    href: "/monthly-budget",
    title: "Monthly budget",
    label: "Monthly budget",
    icon: faWallet,
  },
  expensetracking: {
    href: "/expense-tracking",
    title: "Expense tracking",
    label: "Expense tracking",
    icon: faChartLine,
  },
  savingsinvestments: {
    href: "/savings-and-investments",
    title: "Savings and investments",
    label: "Savings and investments",
    icon: faPiggyBank,
  },
  wishlist: {
    href: "/wishlist",
    title: "Wishlist",
    label: "Wishlist",
    icon: faHeart,
  },
  categories: {
    href: "/categories",
    title: "Categories",
    label: "Categories",
    icon: faTags,
  },
  configuration: {
    href: "/configuration",
    title: "Configuration",
    label: "Configuration",
    icon: faGear,
  },
  privacypolicy: {
    href: "/privacy-policy",
    title: "Privacy policy",
    label: "Privacy policy",
    icon: faArrowUpRightFromSquare,
  },
} as const;
