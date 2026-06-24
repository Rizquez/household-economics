import { createBrowserRouter, RouterProvider } from 'react-router'
import routes from '@/ui/routes'
import PageLoader from '@/ui/routes/components/PageLoader'
import RouteError from '@/ui/routes/components/RouteError'

const router = createBrowserRouter([
  ...routes.map(({ path, component, title }) => {
    const page = <PageLoader component={component} title={title} />

    return {
      path,
      element: page,
      errorElement: <RouteError />,
    }
  }),
])

const AppRouter = () => <RouterProvider router={router} />

export default AppRouter