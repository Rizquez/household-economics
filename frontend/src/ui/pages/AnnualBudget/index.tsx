import AnnualBudgetControls from "./components/AnnualBudgetControls";
import AnnualBudgetTable from "./components/AnnualBudgetTable";
import useAnnualBudgetPage from "./hook/useAnnualBudgetPage";

const AnnualBudget = () => {
  const {
    year,
    yearOptions,
    budgetGroups,
    isReady,
    isUpdatingBudgets,
    setYear,
    updateBudgetAmount,
    saveBudgets,
  } = useAnnualBudgetPage();

  if (!isReady) return null;

  return (
    <div className="flex h-full flex-col gap-6 bg-surface p-6 card">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-text-primary">
          Annual Budget
        </h1>

        <p className="text-sm text-text-secondary">
          Plan your family budget month by month.
        </p>
      </div>

      <AnnualBudgetControls
        year={year}
        yearOptions={yearOptions}
        isUpdatingBudgets={isUpdatingBudgets}
        onYearChange={setYear}
        onSaveBudgets={saveBudgets}
      />

      <AnnualBudgetTable
        budgetGroups={budgetGroups}
        onAmountChange={updateBudgetAmount}
      />
    </div>
  );
};

export default AnnualBudget;
