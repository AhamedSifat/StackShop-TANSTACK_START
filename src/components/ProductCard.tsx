import { Link, useRouter } from '@tanstack/react-router'
import { ShoppingBagIcon } from 'lucide-react'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from './ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card'
import type { ProductSelect } from '@/db/schema'
import { cn } from '@/lib/utils'
import { mutateCartFn } from '@/routes/cart'

export function ProductCard({ product }: { product: ProductSelect }) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const inventoryTone = {
    'in-stock': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    backorder: 'bg-amber-50 text-amber-700 border-amber-100',
    preorder: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  }

  return (
    <Link
      to="/products/$id"
      params={{ id: product.id }}
      className="cursor-pointer h-full transition hover:-translate-y-1 "
    >
      <Card className="px-2 py-4">
        <CardHeader className="gap-2">
          {product.badge && (
            <span className="w-fit rounded-full bg-slate-900 px-2 py-0.5 text-xs font-semibold text-white">
              {product.badge}
            </span>
          )}

          <CardTitle className="text-lg font-semibold">
            {product.name}
          </CardTitle>

          <CardDescription>{product.description}</CardDescription>
        </CardHeader>

        <CardContent className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            <span className="font-semibold">{product.rating}</span>
            <span className="text-slate-400"> ({product.reviews} reviews)</span>
          </p>

          <span
            className={cn(
              'rounded-full border px-3 py-1 text-xs font-semibold',
              inventoryTone[product.inventory],
            )}
          >
            {product.inventory === 'in-stock'
              ? 'In Stock'
              : product.inventory === 'backorder'
                ? 'Backorder'
                : 'Preorder'}
          </span>
        </CardContent>

        <CardFooter className="flex items-center justify-between pt-0">
          <span className="text-lg font-semibold">${product.price}</span>

          <Button
            size="sm"
            variant={'secondary'}
            className="bg-slate-900 text-white hover:bg-slate-800"
            onClick={async (e) => {
              e.preventDefault()
              e.stopPropagation()
              await mutateCartFn({
                data: {
                  action: 'add',
                  productId: product.id,
                  quantity: 1,
                },
              })

              await queryClient.invalidateQueries({
                queryKey: ['cart-items-count'],
              })
            }}
          >
            <ShoppingBagIcon size={16} />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}
