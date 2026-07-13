import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { paths } from "@/ui/routes/paths";
import useAppLayoutVisibility from "@/ui/hooks/useAppLayoutVisibility";

const Footer = () => {
  const year = new Date().getFullYear();
  const { isVisible } = useAppLayoutVisibility();
  if (!isVisible) return null;

  return (
    <footer className="flex justify-between pr-5 pl-5 pb-2">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-text-primary">
          © {year} Household Economics
        </p>
        <p className="text-xs text-text-primary">
          Designed & developed by{" "}
          <a
            href="https://www.linkedin.com/in/karlam-hernandez/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer transition-colors hover:text-primary"
          >
            Karla Hernandez
          </a>{" "}
          and{" "}
          <a
            href="https://www.linkedin.com/in/pedro-rizquez/"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer transition-colors hover:text-primary"
          >
            Pedro Rizquez
          </a>
        </p>
      </div>
      <div className="flex items-center justify-center">
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
