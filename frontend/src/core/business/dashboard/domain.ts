export type DashboardOverviewResponseDto = {
  income: string;
  expenses: string;
  available: string;
  remaining: string;
};

export type DashboardAllocationResponseDto = {
  savings: string;
  investments: string;
  remaining: string;
  has_allocation: boolean;
};

export type DashboardBudgetStatusResponseDto = {
  category_id: number;
  category_name: string;
  budget: string;
  expenses: string;
  income: string;
  available: string;
};

export type DashboardTopExpenseCategoryResponseDto = {
  category_id: number;
  category_name: string;
  amount: string;
};

export type DashboardAnnualAllocationResponseDto = {
  savings: string;
  investments: string;
  total: string;
};

export type DashboardPreviousMonthTransferResponseDto = {
  type: string;
  amount: string;
};

export type DashboardResponseDto = {
  month: number;
  year: number;
  overview: DashboardOverviewResponseDto;
  allocation: DashboardAllocationResponseDto;
  budget_status: DashboardBudgetStatusResponseDto[];
  top_expense_categories: DashboardTopExpenseCategoryResponseDto[];
  annual_allocation: DashboardAnnualAllocationResponseDto;
  previous_month_transfer: DashboardPreviousMonthTransferResponseDto | null;
};
