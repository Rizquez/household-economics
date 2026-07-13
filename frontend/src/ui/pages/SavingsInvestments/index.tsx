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
    isReady,
    setSelectedPeriod,
  } = useSavingsInvestmentsPage();

  if (!isReady) return null;

  return (
    <div className="flex h-full min-h-0 flex-col gap-6 bg-surface p-6 card">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-text-primary">
            Saving and investments
          </h1>

          <p className="text-sm text-text-secondary">
            Allocate what you have left for the month and make your money grow.
          </p>
        </div>
      </div>

      <SavingsInvestmentsControls
        selectedPeriod={selectedPeriod}
        periodOptions={periodOptions}
        onPeriodChange={setSelectedPeriod}
      />

      <div className="grid min-h-0 flex-1 grid-cols-[0.5fr_1fr] gap-4">
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
        />

        <SavingsInvestmentsHistory history={history} />
      </div>
    </div>
  );
};

export default SavingsInvestments;
