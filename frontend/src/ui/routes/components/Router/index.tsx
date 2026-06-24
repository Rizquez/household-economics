import { createBrowserRouter, RouterProvider } from 'react-router'
import routes from '@/ui/routes'
import PageLoader from '@/ui/routes/components/PageLoader'
import RouteError from '@/ui/routes/components/RouteError'
import Sidebar from '@/ui/components/Sidebar';

const router = createBrowserRouter([
  ...routes.map(({ path, component, title }) => {
    return {
      path,
      element: (
        <div className="flex h-screen p-5 gap-5">
  <Sidebar />
  <div className="flex-1">
    <PageLoader component={component} title={title} />
  </div>
</div>
      ),
      errorElement: <RouteError />,
    }
  }),
])

const AppRouter = () => <RouterProvider router={router} />

export default AppRouter