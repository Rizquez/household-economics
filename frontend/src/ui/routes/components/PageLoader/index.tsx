import { Suspense } from 'react'
import type { PageLoaderProps } from '@/ui/routes/components/PageLoader/types'
import { useHead } from '@unhead/react'

const PageLoader = ({
  component: Component,
  title,
}: Readonly<PageLoaderProps>) => {
  useHead({
    title,
  })

  return (
    <Suspense>
      <Component />
    </Suspense>
  )
}

export default PageLoader
