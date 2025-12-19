import { Link } from '@tanstack/react-router'
import { AlertTriangle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="max-w-md w-full text-center shadow-lg">
        <CardContent className="flex flex-col items-center gap-4 py-10">
          <AlertTriangle className="h-12 w-12 text-amber-500" />

          <h1 className="text-4xl font-bold text-slate-900">404</h1>

          <p className="text-lg font-semibold text-slate-700">
            Page not found
          </p>

          <p className="text-sm text-slate-500">
            Sorry, the page you are looking for doesn’t exist or has been moved.
          </p>

          <Button asChild className="mt-4 gap-2">
            <Link to="/">
              <ArrowLeft size={16} />
              Go back home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
