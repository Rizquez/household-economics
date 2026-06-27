import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import type { CategoriesByRecordTypeProps } from "./types";
import useDeleteCategory from "../../hooks/useDeleteCategory";
import Button from "@/ui/components/Button";

const CategoriesByRecordType = ({
  recordType,
  categories,
}: CategoriesByRecordTypeProps) => {
  const { mutate, isPending } = useDeleteCategory();

  return (
    <section className="flex flex-col gap-3 rounded-xl border border-text-secondary/10 bg-background p-4">
      <h2 className="text-lg font-semibold text-text-primary">
        {recordType.name}
      </h2>

      {categories.length === 0 && (
        <p className="text-sm text-text-secondary">No categories found.</p>
      )}

      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between rounded-lg bg-surface px-4 py-2"
          >
            <span className="text-sm text-text-primary">
              {category.name}
            </span>

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
