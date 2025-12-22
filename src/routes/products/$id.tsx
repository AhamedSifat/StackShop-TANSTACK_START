import { createFileRoute } from '@tanstack/react-router'
import { getProductById } from '@/data/products'

export const Route = createFileRoute('/products/$id')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const product = await getProductById(params.id)
    return product
  },
})

function RouteComponent() {
  const product = Route.useLoaderData()

  return <pre>{JSON.stringify(product, null, 2)}</pre>
}
