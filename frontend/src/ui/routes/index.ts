import Dashboard from '@/ui/pages/Dashboard'
import DailyRegister from '@/ui/pages/DailyRegister'
import MonthlyBudget from '@/ui/pages/MonthlyBudget'
import ExpenseTracking from '@/ui/pages/ExpenseTracking'
import SavingsInvestments from '@/ui/pages/SavingsInvestments'
import Wishlist from '@/ui/pages/Wishlist'
import Categories from '@/ui/pages/Categories'
import Configuration from '@/ui/pages/Configuration'
import { paths } from '@/ui/routes/paths'

const routes = [
  {
    path: paths.dashboard.href,
    component: Dashboard,
    title: paths.dashboard.title,
  },
  {
    path: paths.dailyregister.href,
    component: DailyRegister,
    title: paths.dailyregister.title,
  },
  {
    path: paths.monthlybudget.href,
    component: MonthlyBudget,
    title: paths.monthlybudget.title,
  },
  {
    path: paths.expensetracking.href,
    component: ExpenseTracking,
    title: paths.expensetracking.title,
  },
  {
    path: paths.savingsinvestments.href,
    component: SavingsInvestments,
    title: paths.savingsinvestments.title,
  },
  {
    path: paths.wishlist.href,
    component: Wishlist,
    title: paths.wishlist.title,
  },
  {
    path: paths.categories.href,
    component: Categories,
    title: paths.categories.title,
  },
  {
    path: paths.configuration.href,
    component: Configuration,
    title: paths.configuration.title
  }
]

export default routes