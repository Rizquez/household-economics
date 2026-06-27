import { NavLink } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sidebarPathKeys } from "./constants";
import { paths } from "@/ui/routes/paths";
import { UserButton } from "@clerk/clerk-react";

// TODO: implement a real family name and move the userbutton
const Sidebar = () => (
  <aside className="flex h-full flex-col bg-surface card">
    <div className="flex justify-end px-6 pt-6">
      <div className="scale-150">
        <UserButton />
      </div>
    </div>
    <h1 className="text-lg pl-5 pt-5 font-semibold">Family {" ... "} </h1>
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

export default Sidebar;
