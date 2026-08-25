import type { CustomerDetails, Order, OrderItem } from "@/types"

const ORDERS_KEY = "aqua-loops-orders"

/**
 * Orders currently persist to localStorage so the checkout flow works
 * end-to-end without a backend. To move to Supabase later:
 *
 *   1. Create an `orders` table (customer fields, items as jsonb, total,
 *      status, screenshot_url, created_at).
 *   2. Create a `payment-screenshots` storage bucket.
 *   3. Replace `saveOrder` below with a call to
 *      `supabase.from("orders").insert({...})`.
 *   4. Replace the screenshot data-URL handling in Checkout.tsx with
 *      `supabase.storage.from("payment-screenshots").upload(...)` and
 *      store the returned public URL on the order instead of the base64
 *      data URL used here.
 *   5. Replace `getOrders` with a `supabase.from("orders").select("*")`
 *      query (scoped to the current user or an admin view).
 */

function readOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_KEY)
    return raw ? (JSON.parse(raw) as Order[]) : []
  } catch {
    return []
  }
}

function writeOrders(orders: Order[]) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

export function createOrderId() {
  return `AL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
}

export function saveOrder(params: {
  customer: CustomerDetails
  items: OrderItem[]
  total: number
  screenshotName?: string
  screenshotDataUrl?: string
  createdAt: string
}): Order {
  // Supabase target: supabase.from("orders").insert({ ...order, status: "Pending Verification" })
  const order: Order = {
    id: createOrderId(),
    createdAt: params.createdAt,
    customer: params.customer,
    items: params.items,
    total: params.total,
    status: "Pending Verification",
    screenshotName: params.screenshotName,
    screenshotDataUrl: params.screenshotDataUrl,
  }

  const orders = readOrders()
  orders.unshift(order)
  writeOrders(orders)

  return order
}

export function getOrders(): Order[] {
  // Supabase target: supabase.from("orders").select("*").order("created_at", { ascending: false })
  return readOrders()
}
