import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "@/ui/routes";
import PageLoader from "@/ui/routes/components/PageLoader";
import RouteError from "@/ui/routes/components/RouteError";
import Sidebar from "@/ui/components/Sidebar";
import Footer from "@/ui/components/Footer";
import PrivacyPolicy from "@/ui/pages/PrivacyPolicy";
import { paths } from "@/ui/routes/paths";

const router = createBrowserRouter([
  ...routes.map(({ path, component, title }) => ({
    path,
    element: (
      <div className="flex h-screen flex-col">
        <div className="flex flex-1 p-5 gap-5">
          <Sidebar />
          <div className="flex-1">
            <PageLoader component={component} title={title} />
          </div>
        </div>
        <Footer />
      </div>
    ),
    errorElement: <RouteError />,
  })),
  {
    path: paths.privacypolicy.href,
    element: (
      <div className="flex h-screen flex-col">
        <PageLoader
          component={PrivacyPolicy}
          title={paths.privacypolicy.title}
        />
        <Footer />
      </div>
    ),
    errorElement: <RouteError />,
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
