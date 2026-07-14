import httpClient from "@/core/client/httpClient";

import type { DashboardResponseDto } from "./domain";
import type { Dashboard } from "./types";

class DashboardRepository {
  async getDashboard(month: number, year: number): Promise<Dashboard> {
    const response = await httpClient.get<DashboardResponseDto>(
      `/dashboard/${month}/${year}`,
    );

    const dashboard = response.data;

    return {
      month: dashboard.month,
      year: dashboard.year,

      overview: {
        income: Number(dashboard.overview.income),
        expenses: Number(dashboard.overview.expenses),
        available: Number(dashboard.overview.available),
        remaining: Number(dashboard.overview.remaining),
      },

      allocation: {
        savings: Number(dashboard.allocation.savings),
        investments: Number(dashboard.allocation.investments),
        remaining: Number(dashboard.allocation.remaining),
        hasAllocation: dashboard.allocation.has_allocation,
      },

      budgetStatus: dashboard.budget_status.map((budgetStatus) => ({
        categoryId: budgetStatus.category_id,
        categoryName: budgetStatus.category_name,
        budget: Number(budgetStatus.budget),
        expenses: Number(budgetStatus.expenses),
        income: Number(budgetStatus.income),
        available: Number(budgetStatus.available),
      })),

      topExpenseCategories: dashboard.top_expense_categories.map(
        (category) => ({
          categoryId: category.category_id,
          categoryName: category.category_name,
          amount: Number(category.amount),
        }),
      ),

      annualAllocation: {
        savings: Number(dashboard.annual_allocation.savings),
        investments: Number(dashboard.annual_allocation.investments),
        total: Number(dashboard.annual_allocation.total),
      },

      previousMonthTransfer: dashboard.previous_month_transfer
        ? {
            type: dashboard.previous_month_transfer.type,
            amount: Number(dashboard.previous_month_transfer.amount),
          }
        : null,
    };
  }
}

export default DashboardRepository;
