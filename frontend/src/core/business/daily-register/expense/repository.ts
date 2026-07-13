import httpClient from "@/core/client/httpClient";
import type {
  CreateExpenseRequestDto,
  ExpenseItemRequestDto,
  ExpenseResponseDto,
  UpdateExpenseRequestDto,
} from "./domain";
import type {
  CreateExpenseRequest,
  Expense,
  ExpenseItemRequest,
  UpdateExpenseRequest,
} from "./types";

class ExpenseRepository {
  async listByMonthAndYear(month: number, year: number): Promise<Expense[]> {
    const response = await httpClient.get<ExpenseResponseDto[]>(
      `/expense/${month}/${year}`,
    );

    return response.data.map((expense) => this.toExpense(expense));
  }

  async create(payload: CreateExpenseRequest): Promise<Expense> {
    const dto: CreateExpenseRequestDto = {
      name: payload.name,
      created_at: payload.createdAt,
      amount: payload.amount,
      notes: payload.notes,
      category_id: payload.categoryId,
      items: payload.items?.map(this.toItemDto),
    };

    const response = await httpClient.post<ExpenseResponseDto>("/expense", dto);

    return this.toExpense(response.data);
  }

  async update(payload: UpdateExpenseRequest): Promise<Expense> {
    const dto: UpdateExpenseRequestDto = {
      name: payload.name,
      created_at: payload.createdAt,
      amount: payload.amount,
      notes: payload.notes,
      category_id: payload.categoryId,
      items: payload.items?.map(this.toItemDto),
    };

    const response = await httpClient.put<ExpenseResponseDto>(
      `/expense/${payload.id}`,
      dto,
    );

    return this.toExpense(response.data);
  }

  async delete(expenseId: number): Promise<void> {
    await httpClient.delete<void>(`/expense/${expenseId}`);
  }

  private toExpense(dto: ExpenseResponseDto): Expense {
    return {
      id: dto.id,
      name: dto.name,
      createdAt: dto.created_at,
      amount: Number(dto.amount),
      notes: dto.notes,
      categoryId: dto.category_id,
      familyId: dto.family_id,
      items: dto.items.map((item) => ({
        id: item.id,
        product: item.product,
        amount: Number(item.amount),
        categoryId: item.category_id,
        expenseId: item.expense_id,
        categoryName: item.category?.name ?? null,
      })),
      categoryName: dto.category?.name ?? null,
    };
  }

  private toItemDto(item: ExpenseItemRequest): ExpenseItemRequestDto {
    return {
      product: item.product,
      amount: item.amount,
      category_id: item.categoryId,
    };
  }
}

export default ExpenseRepository;
