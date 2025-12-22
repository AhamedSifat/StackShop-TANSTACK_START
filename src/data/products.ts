import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { productsTable } from '@/db/schema'

export const getRecommendedProducts = async () => {
  try {
    const productsData = await db.select().from(productsTable).limit(3)
    return productsData
  } catch (error) {
    console.log(error)
  }
}

export const getAllProducts = async () => {
  try {
    const productsData = await db.select().from(productsTable)
    return productsData
  } catch (error) {
    console.log(error)
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
  }
}
