import { useForm } from '@tanstack/react-form'
import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { z } from 'zod'
import { createServerFn } from '@tanstack/react-start'
import type { AnyFieldApi } from '@tanstack/react-form'
import type {
  BadgeValue,
  InventoryValue,
  ProductInsert,
  ProductSelect,
} from '@/db/schema'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em role="alert" className="mt-1 block text-sm text-red-500">
          ({field.state.meta.errors.map((err) => err.message).join(', ')})
        </em>
      ) : null}

      {field.state.meta.isValidating ? (
        <span className="text-sm text-muted-foreground">Validating...</span>
      ) : null}
    </>
  )
}

type CreateProductData = {
  name: string
  description: string
  price: string
  image: string
  badge?: 'New' | 'Sale' | 'Featured' | 'Limited'
  inventory: 'in-stock' | 'backorder' | 'preorder'
}

export const createProductFn = createServerFn({ method: 'POST' })
  .inputValidator((data: CreateProductData) => data)
  .handler(async ({ data }): Promise<ProductSelect> => {
    const { createProduct: createProductInDb } = await import('@/data/products')
    const productData: ProductInsert = {
      name: data.name,
      description: data.description,
      price: data.price,
      image: data.image,
      badge: data.badge,
      inventory: data.inventory,
    }
    return await createProductInDb(productData)
  })

export const Route = createFileRoute('/products/create-products')({
  component: RouteComponent,
})

const createProductSchema = z.object({
  name: z.string().min(3, 'You must have a length of at least 3'),
  price: z
    .string()
    .refine((value) => !isNaN(Number(value)), 'Price is required'),
  description: z.string().min(1, 'Description is required'),
  image: z
    .string()
    .url('Image must be a valid URL')
    .max(255, 'Image URL is too long'),
  badge: z.enum(['New', 'Sale', 'Featured', 'Limited']),
  rating: z
    .number()
    .min(0, 'Rating is required')
    .max(5, 'Rating must be between 0 and 5'),
  reviews: z.number().min(0, 'Reviews is required'),
  inventory: z.enum(['in-stock', 'backorder', 'preorder']),
})

function RouteComponent() {
  const navigate = useNavigate()
  const router = useRouter()
  const form = useForm({
    defaultValues: {
      name: '',
      price: '',
      description: '',
      image: '',
      badge: 'New',
      rating: 0,
      reviews: 0,
      inventory: 'in-stock',
    },
    validators: {
      onChange: createProductSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createProductFn({
          data: {
            name: value.name,
            description: value.description,
            price: value.price,
            image: value.image,
            badge: value.badge as BadgeValue,
            inventory: value.inventory as InventoryValue,
          },
        })
        router.invalidate({
          sync: true,
        })
        navigate({ to: '/products' })
      } catch (error) {
        console.log(error)
      }
    },
  })

  return (
    <div className="max-auto max-w-7xl py-8 px-4">
      <div className="space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            void form.handleSubmit()
          }}
        >
          <div className="space-y-6">
            <Card>
              <CardHeader className="gap-2">
                <CardTitle className="text-lg">Create Product</CardTitle>
                <CardDescription className="line-clamp-2">
                  Fill in the details to add a new product to the catalog.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardContent className="space-y-6">
                <form.Field
                  name="name"
                  children={(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Name</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter Product Name"
                      />
                      <FieldInfo field={field} />
                    </div>
                  )}
                />

                <form.Field
                  name="description"
                  children={(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Description</Label>
                      <Textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter Product Description"
                      />
                      <FieldInfo field={field} />
                    </div>
                  )}
                />

                <form.Field
                  name="price"
                  children={(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Price</Label>
                      <Input
                        type="number"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        step="0.01"
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="0.0"
                        aria-invalid={!field.state.meta.isValid}
                        aria-describedby={
                          field.state.meta.isValid ? undefined : 'price-error'
                        }
                      />
                      <FieldInfo field={field} />
                    </div>
                  )}
                />

                <form.Field
                  name="image"
                  children={(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Image</Label>
                      <Input
                        type="url"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                      <FieldInfo field={field} />
                    </div>
                  )}
                />

                <form.Field
                  name="badge"
                  children={(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Badge (Optional)</Label>
                      <Select
                        value={field.state.value || ''}
                        onValueChange={(value) =>
                          field.handleChange(value as BadgeValue)
                        }
                      >
                        <SelectTrigger id={field.name} className={'w-full'}>
                          <SelectValue placeholder="Select a badge" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="New">New</SelectItem>
                          <SelectItem value="Sale">Sale</SelectItem>
                          <SelectItem value="Featured">Featured</SelectItem>
                          <SelectItem value="Limited">Limited</SelectItem>
                        </SelectContent>
                      </Select>

                      <FieldInfo field={field} />
                    </div>
                  )}
                />

                <form.Field
                  name="inventory"
                  children={(field) => (
                    <div className="space-y-2">
                      <Label htmlFor={field.name}>Inventory Status</Label>
                      <Select
                        value={field.state.value || ''}
                        onValueChange={(value) =>
                          field.handleChange(value as InventoryValue)
                        }
                      >
                        <SelectTrigger id={field.name} className={'w-full'}>
                          <SelectValue placeholder="Select a inventory" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="in-stock">In Stock</SelectItem>
                          <SelectItem value="backorder">Backorder</SelectItem>
                          <SelectItem value="preorder">Preorder</SelectItem>
                        </SelectContent>
                      </Select>

                      <FieldInfo field={field} />
                    </div>
                  )}
                />

                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isSubmitting]) => (
                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        disabled={!canSubmit || isSubmitting}
                        className="flex-1"
                      >
                        {isSubmitting ? 'Creating...' : 'Create Product'}
                      </Button>
                      <Button
                        type="button"
                        variant={'outline'}
                        onClick={() => navigate({ to: '/products' })}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </form.Subscribe>
              </CardContent>
            </Card>
          </div>
        </form>
      </div>
    </div>
  )
}
