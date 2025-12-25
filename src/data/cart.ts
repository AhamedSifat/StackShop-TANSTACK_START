import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { cartItems, productsTable } from '@/db/schema'

export const getCartItems = async () => {
  const cart = await db
    .select()
    .from(cartItems)
    .innerJoin(productsTable, eq(cartItems.productId, productsTable.id))
  return {
    items: cart.map((item) => ({
      ...item.products,
      quantity: item.cart_items.quantity,
    })),
  }
}
