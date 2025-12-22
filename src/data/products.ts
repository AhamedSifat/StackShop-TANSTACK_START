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
