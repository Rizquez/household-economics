import Dashboard from "@/ui/pages/Dashboard";
import AnnualBudget from "@/ui/pages/AnnualBudget";
import MonthlyTracking from "@/ui/pages/MonthlyTracking";
import SavingsInvestments from "@/ui/pages/SavingsInvestments";
import Categories from "@/ui/pages/Categories";
import FamilyManagement from "@/ui/pages/FamilyManagement";
import { paths } from "@/ui/routes/paths";
import Home from "@/ui/pages/Home";
import PrivacyPolicy from "../pages/PrivacyPolicy";

const routes = [
  {
    path: paths.home.href,
    component: Home,
    title: paths.home.title,
    authRequired: false,
  },
  {
    path: paths.dashboard.href,
    component: Dashboard,
    title: paths.dashboard.title,
    authRequired: true,
  },
  {
    path: paths.annualbudget.href,
    component: AnnualBudget,
    title: paths.annualbudget.title,
    authRequired: true,
  },
  {
    path: paths.monthlytracking.href,
    component: MonthlyTracking,
    title: paths.monthlytracking.title,
    authRequired: true,
  },
  {
    path: paths.savingsinvestments.href,
    component: SavingsInvestments,
    title: paths.savingsinvestments.title,
    authRequired: true,
  },
  {
    path: paths.categories.href,
    component: Categories,
    title: paths.categories.title,
    authRequired: true,
  },
  {
    path: paths.familymanagement.href,
    component: FamilyManagement,
    title: paths.familymanagement.title,
    authRequired: true,
  },
  {
    path: paths.privacypolicy.href,
    component: PrivacyPolicy,
    title: paths.privacypolicy.title,
    authRequired: false,
  },
];

export default routes;
