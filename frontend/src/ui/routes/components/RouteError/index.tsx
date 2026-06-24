import { isRouteErrorResponse, useRouteError } from 'react-router'

// TODO: implement a real style
const RouteError = () => {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>Error {error.status}</h1>
        <p>{error.statusText}</p>
      </>
    )
  }

  return (
    <>
      <h1>Unexpected error</h1>
      <p>{(error as Error).message}</p>
    </>
  )
}

export default RouteError
