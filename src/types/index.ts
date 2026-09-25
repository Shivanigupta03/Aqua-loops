export type ProductCategory = "Storage" | "Dining" | "Décor" | "Bags" | "Combos"

export type ProductSize = "small" | "medium" | "big"

export interface Product {
  id: string
  name: string
  price: number
  /** Package size, used to calculate the per-piece courier charge at checkout. */
  size: ProductSize
  category: ProductCategory
  description: string
  fullDescription: string
  material: string
  handmadeBy: string
  sustainabilityNote: string
  images: ProductImage[]
}

export interface ProductImage {
  src: string
  /** CSS object-position, for photos where the product isn't centered in frame. */
  focus?: string
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface CustomerDetails {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  notes: string
}

export interface OrderItem {
  productId: string
  name: string
  price: number
  quantity: number
}

export type OrderStatus = "Pending Verification" | "Verified" | "Cancelled"

export interface Order {
  id: string
  createdAt: string
  customer: CustomerDetails
  items: OrderItem[]
  subtotal: number
  gst: number
  courier: number
  total: number
  status: OrderStatus
  /** Customer-supplied link (e.g. Google Drive, shared with view access) to their payment screenshot. */
  screenshotUrl?: string
}
