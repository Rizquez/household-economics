import FamilyInformation from "./components/FamilyInformation";
import FamilyMembers from "./components/FamilyMembers";
import useFamilyManagementPage from "./hooks/useFamilyManagementPage";

const FamilyManagement = () => {
  const { isReady, family, familyMembers, currencyTypes } =
    useFamilyManagementPage();

  if (!isReady || !family) return null;

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-x-hidden overflow-y-auto bg-surface p-4 md:gap-6 md:p-6 xl:overflow-hidden card">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-text-primary">
          Family management
        </h1>

        <p className="text-sm text-text-secondary">
          Manage your family group&apos;s information, as well as its members
          and active invitations.
        </p>
      </header>

      <FamilyInformation family={family} currencyTypes={currencyTypes} />

      <FamilyMembers familyMembers={familyMembers} />
    </div>
  );
};

export default FamilyManagement;
