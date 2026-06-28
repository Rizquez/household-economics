import Footer from "@/ui/components/Footer";
import PageLoader from "@/ui/routes/components/PageLoader";
import type { ComponentType } from "react";

const PublicLayout = ({
  component,
  title,
}: {
  component: ComponentType;
  title: string;
}) => (
  <div className="flex h-screen flex-col overflow-hidden">
    <main className="min-h-0 flex-1 p-5">
      <PageLoader component={component} title={title} />
    </main>
    <Footer />
  </div>
);

export default PublicLayout;
