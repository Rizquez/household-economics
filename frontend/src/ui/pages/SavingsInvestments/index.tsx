const SavingsInvestments = () => {
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
    </div>
  );
};

export default SavingsInvestments;
