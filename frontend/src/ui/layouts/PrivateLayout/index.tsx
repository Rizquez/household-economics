import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "@/ui/components/Sidebar";
import Button from "@/ui/components/Button";
import Footer from "@/ui/components/Footer";
import PageLoader from "@/ui/routes/components/PageLoader";
import AccessGuard from "@/ui/routes/components/AccessGuard";
import type { PrivateLayoutProps } from "./types";

const PrivateLayout = ({ component, title }: PrivateLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AccessGuard>
      <div className="flex h-screen flex-col overflow-hidden">
        <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-5 p-5 lg:flex-row">
          <Button
            variant="background"
            className="flex size-10 flex-none items-center justify-center p-0 lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={isSidebarOpen}
            onClick={() => setIsSidebarOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>

          {isSidebarOpen && (
            <button
              type="button"
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              aria-label="Close navigation menu"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <Sidebar
            isOpen={isSidebarOpen}
            onNavigate={() => setIsSidebarOpen(false)}
          />

          <main className="min-h-0 min-w-0 flex-1 overflow-hidden">
            <PageLoader component={component} title={title} />
          </main>
        </div>

        <Footer />
      </div>
    </AccessGuard>
  );
};

export default PrivateLayout;
