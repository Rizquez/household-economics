import CreateCategoryForm from "./components/CreateCategoryForm";
import CategoriesByRecordType from "./components/CategoriesByRecordType";
import useCategoriesPage from "./hooks/useCategoriesPage";

const Categories = () => {
  const { isReady, categoriesByRecordType } = useCategoriesPage();

  if (!isReady) return null;

  const recordTypes = categoriesByRecordType.map(
    ({ recordType }) => recordType,
  );

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 overflow-hidden bg-surface p-4 md:gap-6 md:p-6 card">
      <div className="flex shrink-0 flex-col items-stretch gap-4 xl:flex-row xl:items-center xl:justify-between">
        <header className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold text-text-primary">
            Categories
          </h1>

          <p className="text-sm text-text-secondary">
            Manage and keep your categories organized by record type.
          </p>
        </header>

        <CreateCategoryForm recordTypes={recordTypes} />
      </div>

      <div className="grid min-h-0 flex-1 auto-rows-max grid-cols-1 gap-4 overflow-x-hidden overflow-y-auto xl:auto-rows-auto xl:grid-cols-2 xl:overflow-hidden">
        {categoriesByRecordType.map(({ recordType, categories }) => (
          <CategoriesByRecordType
            key={recordType.id}
            recordType={recordType}
            categories={categories}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
