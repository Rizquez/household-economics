import Sidebar from "@/ui/components/Sidebar";
import Footer from "@/ui/components/Footer";
import PageLoader from "@/ui/routes/components/PageLoader";
import AccessGuard from "@/ui/routes/components/AccessGuard";
import type { PrivateLayoutProps } from "./types";

const PrivateLayout = ({ component, title }: PrivateLayoutProps) => (
  <AccessGuard>
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1 gap-5 p-5">
        <Sidebar />

        <main className="min-h-0 flex-1">
          <PageLoader component={component} title={title} />
        </main>
      </div>

      <Footer />
    </div>
  </AccessGuard>
);

export default PrivateLayout;
