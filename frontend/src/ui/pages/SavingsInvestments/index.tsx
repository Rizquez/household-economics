import SavingsInvestmentsAllocation from "./components/SavingsInvestmentsAllocation";
import SavingsInvestmentsControls from "./components/SavingsInvestmentsControls";
import SavingsInvestmentsHistory from "./components/SavingsInvestmentsHistory";
import useSavingsInvestmentsPage from "./hooks/useSavingsInvestmentsPage";

const SavingsInvestments = () => {
  const {
    selectedPeriod,
    periodOptions,
    year,
    month,
    availableAmount,
    savingsInvestment,
    history,
    family,
    isReady,
    setSelectedPeriod,
  } = useSavingsInvestmentsPage();

  if (!isReady || !family) return null;

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden bg-surface p-4 md:gap-6 md:p-6 card">
      <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center lg:justify-between">
        <header className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-text-primary">
            Saving and investments
          </h1>

          <p className="text-sm text-text-secondary">
            Organize your finances by allocating what you have left for the
            month and make your money grow.
          </p>
        </header>

        <SavingsInvestmentsControls
          selectedPeriod={selectedPeriod}
          periodOptions={periodOptions}
          onPeriodChange={setSelectedPeriod}
        />
      </div>

      <div className="grid min-h-0 flex-1 auto-rows-max grid-cols-1 gap-4 overflow-x-hidden overflow-y-auto xl:auto-rows-auto xl:grid-cols-[0.5fr_1fr] xl:overflow-hidden">
        <SavingsInvestmentsAllocation
          key={[
            year,
            month,
            savingsInvestment?.id ?? "new",
            savingsInvestment?.savingsAmount ?? 0,
            savingsInvestment?.investmentAmount ?? 0,
          ].join("-")}
          year={year}
          month={month}
          availableAmount={availableAmount}
          savingsInvestment={savingsInvestment}
          currencyType={family.currencyType}
        />

        <SavingsInvestmentsHistory
          history={history}
          currencyType={family.currencyType}
        />
      </div>
    </div>
  );
};

export default SavingsInvestments;
