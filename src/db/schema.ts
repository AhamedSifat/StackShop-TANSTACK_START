import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

const badgeValues = ['New', 'Sale', 'Featured', 'Limited'] as const
const inventoryValues = ['in-stock', 'backorder', 'preorder'] as const

export const badgeEnum = pgEnum('badge', badgeValues)
export const inventoryEnum = pgEnum('inventory', inventoryValues)

export const productsTable = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: numeric('price', { precision: 10, scale: 2 }).notNull(),
  badge: badgeEnum('badge'),
  inventory: inventoryEnum('inventory').notNull().default('in-stock'),
  rating: numeric('rating', { precision: 10, scale: 2 }).notNull().default('0'),
  reviews: integer('reviews').notNull().default(0),
  image: varchar('image', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export type ProductSelect = typeof productsTable.$inferSelect
export type ProductInsert = typeof productsTable.$inferInsert

export const cartItems = pgTable('cart_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id')
    .notNull()
    .references(() => productsTable.id, { onDelete: 'cascade' }),
  quantity: integer('quantity').notNull().default(1),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
})

export type CartItemSelect = typeof cartItems.$inferSelect
export type CartItemInsert = typeof cartItems.$inferInsert

export type BadgeValue = (typeof badgeValues)[number]
export type InventoryValue = (typeof inventoryValues)[number]
