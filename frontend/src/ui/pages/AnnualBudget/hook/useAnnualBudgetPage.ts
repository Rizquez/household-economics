import { useEffect, useMemo, useState } from "react";
import type { UpdateBudgetRequest } from "@/core/business/annual-budget/types";
import { useModal } from "@/ui/contexts/ModalContext/hooks/useModal";
import useBudgetGroups from "./useBudgetGroups";
import useBudgetYears from "./useBudgetYears";
import useUpdateBudgets from "./useUpdateBudgets";
import useFormFieldError from "@/ui/hooks/useFormFieldError";

type AnnualBudgetErrorField = `budget.${number}`;

const useAnnualBudgetPage = () => {
  const {
    errorMessage: formError,
    showFieldError,
    clearFieldError,
    clearFormError,
    hasFieldError,
  } = useFormFieldError<AnnualBudgetErrorField>();

  const { showLoading, showModal, closeModal } = useModal();

  const [year, setYear] = useState("");
  const [editedAmounts, setEditedAmounts] = useState<Record<number, number>>(
    {},
  );

  const {
    years,
    isPending: isLoadingBudgetYears,
    isError: isBudgetYearsError,
    error: budgetYearsError,
  } = useBudgetYears();

  const selectedYear = year || String(years[0] ?? "");

  const {
    budgetGroups: fetchedBudgetGroups,
    isPending: isLoadingBudgetGroups,
    isError: isBudgetGroupsError,
    error: budgetGroupsError,
  } = useBudgetGroups(selectedYear);

  const { mutate: updateBudgets, isPending: isUpdatingBudgets } =
    useUpdateBudgets();

  const isLoading =
    isLoadingBudgetYears || Boolean(selectedYear && isLoadingBudgetGroups);

  const hasError = isBudgetYearsError || isBudgetGroupsError;

  useEffect(() => {
    if (isLoading) {
      showLoading("Loading annual budget", "Please wait...");
      return;
    }

    if (hasError) {
      showModal({
        type: "error",
        title: "Error loading annual budget",
        message:
          budgetYearsError?.message ??
          budgetGroupsError?.message ??
          "Unexpected error",
      });
      return;
    }

    closeModal();
  }, [
    isLoading,
    hasError,
    budgetYearsError,
    budgetGroupsError,
    showLoading,
    showModal,
    closeModal,
  ]);

  const yearOptions = useMemo(
    () =>
      years.map((year) => ({
        label: String(year),
        value: year,
      })),
    [years],
  );

  const budgetGroups = useMemo(
    () =>
      fetchedBudgetGroups.map((budgetGroup) => ({
        ...budgetGroup,
        budgets: budgetGroup.budgets.map((budget) => ({
          ...budget,
          amount: editedAmounts[budget.id] ?? budget.amount,
        })),
      })),
    [fetchedBudgetGroups, editedAmounts],
  );

  const updateBudgetAmount = (budgetId: number, amount: number) => {
    setEditedAmounts((currentEditedAmounts) => ({
      ...currentEditedAmounts,
      [budgetId]: amount,
    }));

    clearFieldError(`budget.${budgetId}`);
  };

  const saveBudgets = () => {
    const invalidBudget = budgetGroups
      .flatMap((budgetGroup) => budgetGroup.budgets)
      .find((budget) => budget.amount < 0);

    if (invalidBudget) {
      showFieldError(
        `budget.${invalidBudget.id}`,
        "Budget amounts must be greater than or equal to 0.",
      );

      return;
    }

    clearFormError();

    const changedBudgets: UpdateBudgetRequest[] = fetchedBudgetGroups.flatMap(
      (budgetGroup) =>
        budgetGroup.budgets.flatMap((budget) => {
          const editedAmount = editedAmounts[budget.id];

          if (editedAmount === undefined || editedAmount === budget.amount) {
            return [];
          }

          return [
            {
              id: budget.id,
              amount: editedAmount,
            },
          ];
        }),
    );

    if (!changedBudgets.length) return;

    updateBudgets(changedBudgets, {
      onSuccess: () => {
        setEditedAmounts({});
        clearFormError();
      },
    });
  };

  const handleYearChange = (year: string) => {
    setYear(year);
    setEditedAmounts({});
    clearFormError();
  };

  return {
    year: selectedYear,
    yearOptions,
    budgetGroups,
    formError,
    isReady: !isLoading && !hasError,
    isUpdatingBudgets,
    hasFieldError,
    setYear: handleYearChange,
    updateBudgetAmount,
    saveBudgets,
  };
};

export default useAnnualBudgetPage;
