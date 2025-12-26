import { eq } from 'drizzle-orm'
import { createServerFn } from '@tanstack/react-start'
import { db } from '@/db'
import { cartItems, productsTable } from '@/db/schema'

export const getCartItemsFn = async () => {
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

const addToCart = async (productId: string, quantity: number) => {
  const qty = Math.max(1, Math.min(quantity, 99))
  const existingItem = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.productId, productId))
    .limit(1)

  if (existingItem.length > 0) {
    const newQty = Math.max(1, Math.min(existingItem[0].quantity + qty, 99))
    await db
      .update(cartItems)
      .set({ quantity: newQty })
      .where(eq(cartItems.productId, existingItem[0].productId))
  } else {
    await db.insert(cartItems).values({ productId, quantity })
  }

  return getCartItemsFn()
}

const updateCartItem = async (productId: string, quantity: number) => {
  const qty = Math.max(1, Math.min(quantity, 99))
  await db
    .update(cartItems)
    .set({ quantity: qty })
    .where(eq(cartItems.productId, productId))

  return getCartItemsFn()
}

export const mutateCartFn = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      action: 'add' | 'remove' | 'update' | 'clear'
      productId: string
      quantity: number
    }) => data,
  )
  .handler(async ({ data }) => {
    switch (data.action) {
      case 'add':
        return addToCart(data.productId, data.quantity)
      case 'remove':
        break
      case 'update':
        return updateCartItem(data.productId, data.quantity)
      case 'clear':
        break
    }
  })
