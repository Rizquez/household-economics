import { NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { paths } from "@/ui/routes/paths";
import { UserButton } from "@clerk/clerk-react";
import useFamilyUser from "./hooks/useFamilyUser";
import { useIsFetching } from "@tanstack/react-query";

const sidebarPathKeys = [
  "dashboard",
  "monthlytracking",
  "annualbudget",
  "savingsinvestments",
  "categories",
] as const;

const Sidebar = () => {
  const { family } = useFamilyUser();

  const isLoading = useIsFetching({
    predicate: (query) =>
      query.state.fetchStatus === "fetching" && query.state.data === undefined,
  });

  if (isLoading > 0 || !family) return null;

  return (
    <aside className="flex h-full shrink-0 flex-col bg-surface card">
      <div className="flex justify-end px-6 pt-6">
        <div className="scale-150">
          <UserButton />
        </div>
      </div>
      <h1 className="text-lg pl-5 pt-5 font-semibold">{family.name} </h1>
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
          key={paths.configuration.href}
          to={paths.configuration.href}
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
          <FontAwesomeIcon icon={paths.configuration.icon} />
          <span>{paths.configuration.label}</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
