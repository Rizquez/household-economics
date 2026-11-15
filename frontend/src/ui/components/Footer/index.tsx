import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { paths } from "@/ui/routes/paths";
import useAppLayoutVisibility from "@/ui/hooks/useAppLayoutVisibility";

const Footer = () => {
  const year = new Date().getFullYear();
  const { isVisible } = useAppLayoutVisibility();
  if (!isVisible) return null;

  return (
    <footer className="flex flex-col gap-2 pr-5 pl-5 pb-5 md:flex-row md:justify-between md:gap-0">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-text-primary">
          © {year} Household Economics
        </p>
      </div>
      <div className="flex items-center justify-start md:justify-center">
        <Link
          to={paths.privacypolicy.href}
          className="flex items-center gap-3 text-sm text-text-primary transition-colors hover:text-primary"
        >
          <span>{paths.privacypolicy.label}</span>
          <FontAwesomeIcon icon={paths.privacypolicy.icon} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
