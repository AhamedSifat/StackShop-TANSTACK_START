import { Minus, Plus } from 'lucide-react'
import { Link, createFileRoute } from '@tanstack/react-router'
import { EmptyCartState } from '@/components/cart/EmptyCartState'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/cart')({
  component: RouteComponent,
})

function RouteComponent() {
  const cart = { items: [] }
  const shipping = cart.items.length > 0 ? 8 : 0
  const subtotal = 0
  const total = subtotal + shipping

  if (cart.items.length === 0) {
    return <EmptyCartState />
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-6 rounded-2xl border bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80 lg:grid-cols-[2fr,1fr]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Cart</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Review your picks before checking out.
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => {}}>
            Clear cart
          </Button>
        </div>

        <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-xs dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-950/40">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="grid gap-4 p-4 sm:grid-cols-[auto,1fr,auto]"
            >
              <div className="hidden h-20 w-20 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900 sm:flex">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-12 w-12 object-contain"
                  loading="lazy"
                />
              </div>
              <div className="space-y-1">
                <Link
                  to="/products/$id"
                  params={{ id: item.id }}
                  className="text-base font-semibold hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {item.name}
                </Link>
                <div className="flex items-center gap-3 text-sm font-semibold">
                  <span>${Number(item.price).toFixed(2)}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600 dark:text-slate-300">
                    {item.inventory === 'in-stock'
                      ? 'In stock'
                      : item.inventory === 'backorder'
                        ? 'Backorder'
                        : 'Preorder'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 sm:items-center sm:justify-between sm:gap-2 sm:text-right">
                <div className="flex items-center gap-2">
                  <Button
                    size="icon-sm"
                    variant="outline"
                    aria-label={`Decrease ${item.name}`}
                    onClick={() => {}}
                  >
                    <Minus size={14} />
                  </Button>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={item.quantity}
                    onChange={(event) => {}}
                    className="h-9 w-14 rounded-md border border-slate-200 bg-white text-center text-sm font-semibold shadow-xs dark:border-slate-800 dark:bg-slate-900"
                  />
                  <Button
                    size="icon-sm"
                    variant="outline"
                    aria-label={`Increase ${item.name}`}
                    onClick={() => {}}
                  >
                    <Plus size={14} />
                  </Button>
                </div>
                <div className="text-sm font-semibold">
                  ${(Number(item.price) * item.quantity).toFixed(2)}
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-slate-500 hover:text-red-500"
                  onClick={() => {}}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* <CartFooter subtotal={subtotal} shipping={shipping} total={total} /> */}
    </div>
  )
}
