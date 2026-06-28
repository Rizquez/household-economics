import Sidebar from "@/ui/components/Sidebar";
import AuthGuard from "@/ui/routes/components/AuthGuard";
import PageLoader from "@/ui/routes/components/PageLoader";
import Footer from "@/ui/components/Footer";
import type { ComponentType } from "react";

const PrivateLayout = ({
  component,
  title,
}: {
  component: ComponentType;
  title: string;
}) => (
  <AuthGuard>
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="flex min-h-0 flex-1 gap-5 p-5">
        <Sidebar />
        <main className="min-h-0 flex-1">
          <PageLoader component={component} title={title} />
        </main>
      </div>
      <Footer />
    </div>
  </AuthGuard>
);

export default PrivateLayout;
