import { NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { paths } from "@/ui/routes/paths";
import { UserButton } from "@clerk/clerk-react";
import useFamilyUser from "./hooks/useFamilyUser";
import useAppLayoutVisibility from "@/ui/hooks/useAppLayoutVisibility";

const sidebarPathKeys = [
  "dashboard",
  "monthlytracking",
  "savingsinvestments",
  "annualbudget",
  "categories",
] as const;

const Sidebar = () => {
  const { family } = useFamilyUser();
  const { isVisible } = useAppLayoutVisibility(Boolean(family));
  if (!isVisible || !family) return null;

  return (
    <aside className="flex h-full w-65 flex-none flex-col bg-surface card">
      <div className="flex justify-end px-6 pt-6">
        <div className="scale-150">
          <UserButton />
        </div>
      </div>

      <div className="px-5 pt-5">
        <h1
          className="block w-full truncate text-lg font-semibold"
          title={family.name}
        >
          {family.name}
        </h1>
      </div>
      <nav className="flex flex-col gap-1 p-5">
        {sidebarPathKeys.map((key) => {
          const path = paths[key];
          return (
            <NavLink
              key={path.href}
              to={path.href}
              end
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-md px-3 py-2 transition-colors text-sm",
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-text-primary hover:bg-background hover:text-primary",
                ].join(" ")
              }
            >
              <FontAwesomeIcon icon={path.icon} />
              <span>{path.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="mt-auto p-5">
        <NavLink
          key={paths.familymanagement.href}
          to={paths.familymanagement.href}
          end
          className={({ isActive }) =>
            [
              "flex items-center gap-3 rounded-md px-3 py-2 transition-colors text-sm",
              isActive
                ? "bg-primary/15 text-primary"
                : "text-text-primary hover:bg-background hover:text-primary",
            ].join(" ")
          }
        >
          <FontAwesomeIcon icon={paths.familymanagement.icon} />
          <span>{paths.familymanagement.label}</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
