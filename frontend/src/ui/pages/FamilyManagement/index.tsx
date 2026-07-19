import FamilyForm from "./components/FamilyForm";
import useFamilyManagementPage from "./hooks/useFamilyManagementPage";

const FamilyManagement = () => {
  const { isReady, family } = useFamilyManagementPage();

  if (!isReady || !family) return null;

  return (
    <div className="flex h-full min-h-0 flex-col gap-6 bg-surface p-6 card">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-text-primary">
          Family management
        </h1>

        <p className="text-sm text-text-secondary">
          Manage your family group&apos;s information, as well as its members and active invitations.
        </p>
      </header>

      <FamilyForm family={family} />
    </div>
  );
};

export default FamilyManagement;
