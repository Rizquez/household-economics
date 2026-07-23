import AnnualBudgetControls from "./components/AnnualBudgetControls";
import AnnualBudgetTable from "./components/AnnualBudgetTable";
import useAnnualBudgetPage from "./hook/useAnnualBudgetPage";

const AnnualBudget = () => {
  const {
    year,
    yearOptions,
    budgetGroups,
    family,
    formError,
    isReady,
    isUpdatingBudgets,
    hasFieldError,
    setYear,
    updateBudgetAmount,
    saveBudgets,
  } = useAnnualBudgetPage();

  if (!isReady || !family) return null;

  return (
    <div className="flex h-full flex-col gap-6 bg-surface p-6 card">
      <div className="flex items-center justify-between gap-4">
        <header className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-text-primary">
            Annual Budget
          </h1>

          <p className="text-sm text-text-secondary">
            Plan, adjust, and keep track of your family budget by category.
          </p>
        </header>

        <AnnualBudgetControls
          year={year}
          yearOptions={yearOptions}
          hasBudgetGroups={Boolean(budgetGroups.length)}
          isUpdatingBudgets={isUpdatingBudgets}
          formError={formError}
          onYearChange={setYear}
          onSaveBudgets={saveBudgets}
        />
      </div>

      <AnnualBudgetTable
        budgetGroups={budgetGroups}
        currencyType={family.currencyType}
        hasFieldError={hasFieldError}
        onAmountChange={updateBudgetAmount}
      />
    </div>
  );
};

export default AnnualBudget;
