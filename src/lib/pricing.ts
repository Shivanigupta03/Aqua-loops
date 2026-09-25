import type { Product, ProductSize } from "@/types"

export const GST_RATE = 0.05

export const COURIER_RATES: Record<ProductSize, number> = {
  small: 100,
  medium: 150,
  big: 200,
}

export interface PricedLine {
  product: Product
  quantity: number
}

export function calculateCourier(lines: PricedLine[]) {
  return lines.reduce(
    (sum, { product, quantity }) => sum + COURIER_RATES[product.size] * quantity,
    0
  )
}

export function calculateGST(subtotal: number) {
  return Math.round(subtotal * GST_RATE)
}
