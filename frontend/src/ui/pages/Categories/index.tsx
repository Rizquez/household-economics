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
    <div className="flex h-full min-h-0 flex-col gap-6 bg-surface p-6 card">
      <div className="flex items-center justify-between gap-4">
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

      <div className="grid min-h-0 flex-1 gap-4 md:grid-cols-2">
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
