import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFloppyDisk,
  faPenToSquare,
  faTrashCan,
  faXmark,
  faFileExport,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import Button from "@/ui/components/Button";
import Input from "@/ui/components/Input";
import Tooltip from "@/ui/components/Tooltip";
import type { CategoriesByRecordTypeProps } from "./types";
import useCategoriesByRecordType from "./hooks/useCategoriesByRecordType.ts";

const CategoriesByRecordType = ({
  recordType,
  categories,
}: CategoriesByRecordTypeProps) => {
  const {
    editingCategoryId,
    editingCategoryName,
    isDeleting,
    isUpdating,
    isExportingToAnnualBudget,
    setEditingCategoryName,
    handleEdit,
    handleCancel,
    handleSave,
    exportToAnnualBudget,
    confirmDelete,
  } = useCategoriesByRecordType(recordType.id, recordType.name);

  const canExportToAnnualBudget = recordType.name === "Expenses";

  return (
    <section className="flex min-w-0 flex-col overflow-visible rounded-xl border border-text-secondary/10 bg-background xl:min-h-0 xl:overflow-hidden">
      <h2 className="sticky top-0 z-10 flex items-center gap-2 bg-background p-4 text-lg font-semibold text-text-primary">
        <span className="min-w-0 wrap-break-word">{recordType.name}</span>

        {canExportToAnnualBudget && (
          <Tooltip text="Only expense categories can be exported to the annual budget. Exports apply only to the current year. Export the category again next year to include it in a new annual budget.">
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="h-4 w-4 shrink-0 cursor-pointer text-text-secondary"
            />
          </Tooltip>
        )}
      </h2>

      <div className="flex flex-1 flex-col gap-2 overflow-visible px-4 pb-4 xl:min-h-0 xl:overflow-y-auto">
        {categories.length === 0 && (
          <p className="text-sm text-text-secondary">No categories found.</p>
        )}

        {categories.map((category) => {
          const isEditing = editingCategoryId === category.id;

          return (
            <div
              key={category.id}
              className="flex flex-col items-stretch gap-3 rounded-lg bg-surface px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-4 sm:py-2"
            >
              {isEditing ? (
                <div className="min-w-0 w-full sm:flex-1">
                  <Input
                    id={`category-${category.id}`}
                    value={editingCategoryName}
                    className="h-9 w-full"
                    onChange={(event) =>
                      setEditingCategoryName(event.target.value)
                    }
                  />
                </div>
              ) : (
                <span className="min-w-0 flex-1 wrap-break-word text-sm text-text-primary">
                  {category.name}
                </span>
              )}

              {isEditing ? (
                <div className="flex shrink-0 self-end gap-2">
                  <Tooltip text="Save change">
                    <Button
                      className="shrink-0"
                      disabled={isUpdating}
                      onClick={handleSave}
                    >
                      <FontAwesomeIcon icon={faFloppyDisk} />
                    </Button>
                  </Tooltip>
                  <Tooltip text="Cancel">
                    <Button
                      variant="danger"
                      className="shrink-0"
                      disabled={isUpdating}
                      onClick={handleCancel}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </Button>
                  </Tooltip>
                </div>
              ) : (
                <div className="flex shrink-0 self-end gap-2">
                  {canExportToAnnualBudget && (
                    <Tooltip text="Export to annual budget">
                      <Button
                        className="shrink-0"
                        disabled={
                          isDeleting || isUpdating || isExportingToAnnualBudget
                        }
                        onClick={() => exportToAnnualBudget(category.id)}
                      >
                        <FontAwesomeIcon icon={faFileExport} />
                      </Button>
                    </Tooltip>
                  )}

                  <Tooltip text="Edit">
                    <Button
                      variant="secondary"
                      className="shrink-0"
                      disabled={
                        isDeleting || isUpdating || isExportingToAnnualBudget
                      }
                      onClick={() => handleEdit(category.id, category.name)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                  </Tooltip>

                  <Tooltip text="Delete">
                    <Button
                      variant="danger"
                      className="shrink-0"
                      disabled={
                        isDeleting || isUpdating || isExportingToAnnualBudget
                      }
                      onClick={() => confirmDelete(category.id)}
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </Button>
                  </Tooltip>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CategoriesByRecordType;
