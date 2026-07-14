export type DashboardOverview = {
  income: number;
  expenses: number;
  available: number;
  remaining: number;
};

export type DashboardAllocation = {
  savings: number;
  investments: number;
  remaining: number;
  hasAllocation: boolean;
};

export type DashboardBudgetStatus = {
  categoryId: number;
  categoryName: string;
  budget: number;
  expenses: number;
  income: number;
  available: number;
};

export type DashboardTopExpenseCategory = {
  categoryId: number;
  categoryName: string;
  amount: number;
};

export type DashboardAnnualAllocation = {
  savings: number;
  investments: number;
  total: number;
};

export type DashboardPreviousMonthTransfer = {
  type: string;
  amount: number;
};

export type Dashboard = {
  month: number;
  year: number;
  overview: DashboardOverview;
  allocation: DashboardAllocation;
  budgetStatus: DashboardBudgetStatus[];
  topExpenseCategories: DashboardTopExpenseCategory[];
  annualAllocation: DashboardAnnualAllocation;
  previousMonthTransfer: DashboardPreviousMonthTransfer | null;
};
