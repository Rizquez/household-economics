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
    <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-background">
      <h2 className="sticky top-0 z-10 flex items-center bg-background p-4 text-lg font-semibold text-text-primary">
        <span>{recordType.name}</span>

        {canExportToAnnualBudget && (
          <Tooltip text="Only expense categories can be exported to the Annual Budget. Exports apply only to the current year. Export the category again next year to include it in a new annual budget.">
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="ml-2 h-4 w-4 cursor-pointer text-text-secondary"
            />
          </Tooltip>
        )}
      </h2>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-4 pb-4">
        {categories.length === 0 && (
          <p className="text-sm text-text-secondary">No categories found.</p>
        )}

        {categories.map((category) => {
          const isEditing = editingCategoryId === category.id;

          return (
            <div
              key={category.id}
              className="flex items-center justify-between gap-3 rounded-lg bg-surface px-4 py-2"
            >
              {isEditing ? (
                <Input
                  id={`category-${category.id}`}
                  value={editingCategoryName}
                  className="h-9"
                  onChange={(event) =>
                    setEditingCategoryName(event.target.value)
                  }
                />
              ) : (
                <span className="text-sm text-text-primary">
                  {category.name}
                </span>
              )}

              {isEditing ? (
                <div className="flex gap-2">
                  <Tooltip text="Save change">
                    <Button disabled={isUpdating} onClick={handleSave}>
                      <FontAwesomeIcon icon={faFloppyDisk} />
                    </Button>
                  </Tooltip>
                  <Tooltip text="Cancel">
                    <Button
                      variant="danger"
                      disabled={isUpdating}
                      onClick={handleCancel}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </Button>
                  </Tooltip>
                </div>
              ) : (
                <div className="flex gap-2">
                  {canExportToAnnualBudget && (
                    <Tooltip text="Export to annual budget">
                      <Button
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
