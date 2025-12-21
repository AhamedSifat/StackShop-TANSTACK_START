import { createRouter } from '@tanstack/react-router'

// Import the generated route tree
import { QueryClient } from '@tanstack/react-query'
import { routeTree } from './routeTree.gen.ts'
import NotFound from './components/NotFound'
// Create a new router instance
export const getRouter = () => {
  const queryClient = new QueryClient()
  const router = createRouter({
    routeTree,
    scrollRestoration: true,
    context: { queryClient },
    defaultPreloadStaleTime: 0,
    defaultPreload: 'intent',
    defaultNotFoundComponent: () => {
      return <NotFound />
    },
  })

  return router
}
