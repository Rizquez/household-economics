import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import type { CategoriesByRecordTypeProps } from "./types";
import useDeleteCategory from "@/ui/pages/Categories/hooks/useDeleteCategory";
import Button from "@/ui/components/Button";

const CategoriesByRecordType = ({
  recordType,
  categories,
}: CategoriesByRecordTypeProps) => {
  const { mutate, isPending } = useDeleteCategory();

  return (
    <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-background">
      <h2 className="sticky top-0 z-10 bg-background p-4 text-lg font-semibold text-text-primary">
        {recordType.name}
      </h2>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4 pb-4">
        {categories.length === 0 && (
          <p className="text-sm text-text-secondary">No categories found.</p>
        )}

        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between rounded-lg bg-surface px-4 py-2"
          >
            <span className="text-sm text-text-primary">{category.name}</span>

            <Button
              variant="danger"
              disabled={isPending}
              onClick={() => mutate(category.id)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesByRecordType;