import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Button from "@/ui/components/Button";
import Tooltip from "@/ui/components/Tooltip";
import type { FamilyMembersProps } from "./types";
import useFamilyMembersControls from "./hooks/useFamilyMembersControls";
import useFamilyInvitationForm from "./hooks/useFamilyInvitationForm";
import Input from "@/ui/components/Input";

const FamilyMembers = ({ familyMembers }: FamilyMembersProps) => {
  const { isRemoving, confirmRemove } = useFamilyMembersControls();

  const {
    email,
    formError,
    isPending: isSendingInvitation,
    handleSubmit,
    hasFieldError,
    clearFieldError,
    setEmail,
  } = useFamilyInvitationForm();

  return (
    <section className="flex flex-col overflow-visible rounded-xl border border-text-secondary/10 bg-background xl:min-h-0 xl:overflow-hidden">
      <header className="flex flex-col items-stretch gap-4 p-4 md:p-6 xl:flex-row xl:items-start xl:justify-between xl:gap-8">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-text-primary">
            Family members
          </h2>

          <p className="text-sm text-text-secondary">
            Manage all your family members directly.
          </p>
        </div>

        <form
          noValidate
          className="flex w-full flex-col gap-2 xl:max-w-sm"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-end">
            <div className="min-w-0 flex-1">
              <Input
                label="Invite a new member"
                name="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  clearFieldError("email");
                }}
                placeholder="person@example.com"
                disabled={isSendingInvitation}
                error={hasFieldError("email")}
              />
            </div>

            <Button
              type="submit"
              className="h-10 w-full shrink-0 sm:w-auto"
              disabled={isSendingInvitation}
            >
              {isSendingInvitation ? "Sending..." : "Send"}
            </Button>
          </div>

          {hasFieldError("email") && formError && (
            <div className="min-w-0 wrap-break-word text-sm text-error">
              <p>{formError}</p>
            </div>
          )}
        </form>
      </header>

      <div className="overflow-x-auto px-4 pb-4 md:px-6 md:pb-6 xl:min-h-0">
        <table className="w-full min-w-160 border-collapse text-left">
          <thead>
            <tr className="border-b border-text-secondary/10">
              <th className="w-40 max-w-40 px-4 py-3 text-sm font-medium text-text-secondary xl:w-auto xl:max-w-none">
                Name
              </th>

              <th className="w-64 max-w-64 px-4 py-3 text-sm font-medium text-text-secondary xl:w-auto xl:max-w-none">
                Email
              </th>

              <th className="min-w-28 whitespace-nowrap px-4 py-3 text-sm font-medium text-text-secondary">
                Role
              </th>

              <th className="w-28 whitespace-nowrap px-4 py-3 text-right text-sm font-medium text-text-secondary">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {familyMembers.map((member) => {
              return (
                <tr
                  key={member.id}
                  className="border-b border-text-secondary/10 last:border-b-0"
                >
                  <td className="w-40 max-w-40 wrap-break-word px-4 py-3 text-sm text-text-primary xl:w-auto xl:max-w-none xl:break-normal">
                    <div className="flex items-center gap-2">
                      <span>{member.name}</span>
                    </div>
                  </td>

                  <td className="w-64 max-w-64 break-all px-4 py-3 text-sm text-text-secondary xl:w-auto xl:max-w-none xl:break-normal">
                    {member.email}
                  </td>

                  <td className="min-w-28 whitespace-nowrap px-4 py-3 text-sm text-text-primary">
                    {member.role}
                  </td>

                  <td className="w-28 whitespace-nowrap px-4 py-3 text-right">
                    <Tooltip text="Remove family member.">
                      <Button
                        variant="danger"
                        className="shrink-0"
                        disabled={isRemoving}
                        onClick={() => confirmRemove(member)}
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </Button>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default FamilyMembers;
