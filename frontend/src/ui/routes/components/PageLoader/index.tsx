import { useHead } from '@unhead/react'
import type { PageLoaderProps } from '@/ui/routes/components/PageLoader/types'

const PageLoader = ({
  component: Component,
  title,
}: Readonly<PageLoaderProps>) => {
  useHead({ title })

  return <Component />
}

export default PageLoader