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
    <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-text-secondary/10 bg-background">
      <header className="flex flex-col gap-1 p-6">
        <h2 className="text-lg font-semibold text-text-primary">
          Family members
        </h2>

        <p className="text-sm text-text-secondary">
          Manage all your family members directly.
        </p>
        <form
          noValidate
          className="relative mt-6 flex items-end gap-3"
          onSubmit={handleSubmit}
        >
          <div className="w-full max-w-md">
            <Input
              label="Invite a family member"
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

            {hasFieldError("email") && formError && (
              <div className="absolute left-0 top-full mt-2 text-sm text-error">
                {formError && <p>{formError}</p>}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="h-10 shrink-0"
            disabled={isSendingInvitation}
          >
            {isSendingInvitation ? "Sending..." : "Send"}
          </Button>
        </form>
      </header>

      <div className="min-h-0 overflow-x-auto px-6 pb-6">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-text-secondary/10">
              <th className="px-4 py-3 text-sm font-medium text-text-secondary">
                Name
              </th>

              <th className="px-4 py-3 text-sm font-medium text-text-secondary">
                Email
              </th>

              <th className="px-4 py-3 text-sm font-medium text-text-secondary">
                Role
              </th>

              <th className="px-4 py-3 text-right text-sm font-medium text-text-secondary">
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
                  <td className="px-4 py-3 text-sm text-text-primary">
                    <div className="flex items-center gap-2">
                      <span>{member.name}</span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-sm text-text-secondary">
                    {member.email}
                  </td>

                  <td className="px-4 py-3 text-sm text-text-primary">
                    {member.role}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <Tooltip text="Remove family member.">
                      <Button
                        variant="danger"
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
