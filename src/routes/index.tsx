import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div>
      Main Page <Link to="/products">Products</Link>
    </div>
  )
}
