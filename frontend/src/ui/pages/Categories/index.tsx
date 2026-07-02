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
    <div className="flex h-full flex-col gap-6 bg-surface p-6 card">
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-text-primary">
          Categories
        </h1>

        <p className="text-sm text-text-secondary">
          Manage your categories based on the type of record.
        </p>
      </div>

      <CreateCategoryForm recordTypes={recordTypes} />

      <div className="grid gap-4 md:grid-cols-2">
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
