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
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden bg-surface p-4 md:gap-6 md:p-6 card">
      <div className="flex shrink-0 flex-col items-stretch gap-4 xl:flex-row xl:items-center xl:justify-between">
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
