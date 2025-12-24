import { eq } from 'drizzle-orm'
import type { ProductInsert, ProductSelect } from '@/db/schema'
import { db } from '@/db'
import { productsTable } from '@/db/schema'

export const getRecommendedProducts = async () => {
  try {
    const productsData = await db.select().from(productsTable).limit(3)
    return productsData
  } catch (error) {
    console.log(error)
    return []
  }
}

export const getAllProducts = async () => {
  try {
    const productsData = await db.select().from(productsTable)
    return productsData
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getProductById = async (id: string) => {
  try {
    const productData = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id))
    return productData[0]
  } catch (error) {
    console.log(error)
    return undefined
  }
}

export const createProduct = async (
  productData: ProductInsert,
): Promise<ProductSelect> => {
  try {
    const result = await db
      .insert(productsTable)
      .values(productData)
      .returning()
    if (!result[0]) {
      throw new Error('Product not found')
    }
    return result[0]
  } catch (error) {
    console.log(error)
    throw error
  }
}
