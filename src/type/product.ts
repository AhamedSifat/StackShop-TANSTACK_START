export type InventoryStatus = 'in-stock' | 'backorder' | 'preorder'

export interface Product {
  name: string
  description: string
  price: string
  badge?: string
  rating: string
  reviews: number
  image: string
  inventory: InventoryStatus
}
