import { and, desc, eq, gt } from 'drizzle-orm'
import { db } from '@/db'
import { cartItems, productsTable } from '@/db/schema'

export const getCartItems = async () => {
  const cart = await db
    .select()
    .from(cartItems)
    .innerJoin(productsTable, eq(cartItems.productId, productsTable.id))
    .orderBy(desc(cartItems.createdAt))
  return {
    items: cart.map((item) => ({
      ...item.products,
      quantity: item.cart_items.quantity,
    })),
  }
}

export const addToCart = async (productId: string, quantity: number) => {
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

  return getCartItems()
}

export const updateCartItem = async (productId: string, quantity: number) => {
  const qty = Math.max(0, Math.min(quantity, 99))

  if (qty === 0) {
    await db.delete(cartItems).where(eq(cartItems.productId, productId))
    return
  }

  await db
    .update(cartItems)
    .set({ quantity: qty })
    .where(eq(cartItems.productId, productId))

  return getCartItems()
}

export const removeFromCart = async (productId: string) => {
  await db.delete(cartItems).where(eq(cartItems.productId, productId))
}

export const clearCart = async () => {
  await db.delete(cartItems).where(gt(cartItems.quantity, 0))
}

export const getCartItemsCount = async () => {
  const cart = await getCartItems()
  const count = cart.items.reduce(
    (acc: number, item) => acc + Number(item.quantity),
    0,
  )
  return {
    count,
    total: cart.items.reduce(
      (acc: number, item) => acc + Number(item.price) * Number(item.quantity),
      0,
    ),
  }
}
