import { supabase } from "@/lib/supabaseClient"
import type { CustomerDetails, Order, OrderItem } from "@/types"

export function createOrderId() {
  return `AL-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
}

export async function saveOrder(params: {
  id: string
  customer: CustomerDetails
  items: OrderItem[]
  subtotal: number
  gst: number
  courier: number
  total: number
  screenshotUrl?: string
  createdAt: string
}): Promise<Order> {
  const order: Order = {
    id: params.id,
    createdAt: params.createdAt,
    customer: params.customer,
    items: params.items,
    subtotal: params.subtotal,
    gst: params.gst,
    courier: params.courier,
    total: params.total,
    status: "Pending Verification",
    screenshotUrl: params.screenshotUrl,
  }

  const { error } = await supabase.from("orders").insert({
    id: order.id,
    created_at: order.createdAt,
    customer: order.customer,
    items: order.items,
    subtotal: order.subtotal,
    gst: order.gst,
    courier: order.courier,
    total: order.total,
    status: order.status,
    screenshot_url: order.screenshotUrl,
  })
  if (error) throw error

  return order
}

/**
 * Requires an authenticated role with a SELECT policy on `orders` (the
 * storefront's anon key can only insert) — for a future admin view.
 */
export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw error

  return (data ?? []).map((row) => ({
    id: row.id,
    createdAt: row.created_at,
    customer: row.customer,
    items: row.items,
    subtotal: row.subtotal,
    gst: row.gst,
    courier: row.courier,
    total: row.total,
    status: row.status,
    screenshotUrl: row.screenshot_url ?? undefined,
  }))
}
