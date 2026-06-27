import { createBrowserRouter, RouterProvider } from "react-router";
import routes from "@/ui/routes";
import RouteError from "@/ui/routes/components/RouteError";
import PrivacyPolicy from "@/ui/pages/PrivacyPolicy";
import { paths } from "@/ui/routes/paths";
import PrivateLayout from "@/ui/layouts/PrivateLayout";
import PublicLayout from "@/ui/layouts/PublicLayout";

const router = createBrowserRouter([
  ...routes.map(({ path, component, title, authRequired }) => ({
    path,
    element: authRequired ? (
      <PrivateLayout component={component} title={title} />
    ) : (
      <PublicLayout component={component} title={title} />
    ),
    errorElement: <RouteError />,
  })),
  {
    path: paths.privacypolicy.href,
    element: (
      <PublicLayout
        component={PrivacyPolicy}
        title={paths.privacypolicy.title}
      />
    ),
    errorElement: <RouteError />,
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
