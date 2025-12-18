import { Link } from '@tanstack/react-router'
import { ShoppingBag } from 'lucide-react'

export default function Header() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                <ShoppingBag size={24} />
              </div>
            </Link>
            <div className="flex flex-col">
              <span className="text-xm font-semibold text-slate-900 dark:text-white">
                StackShop
              </span>
            </div>

            <nav className="items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200 sm:flex">
              <Link
                className="rounded-lg border border-slate-200 px-3 py-1 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800"
                to="/products"
              >
                Products
              </Link>
              {/* <Link to="/create-products">Create Products</Link>
        <Link to="/cart">Cart</Link> */}
            </nav>
          </div>
        </div>
      </header>
    </>
  )
}
