import { supabase } from "@/lib/supabaseClient"
import type { Testimonial } from "@/types"

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .eq("status", "Approved")
    .order("created_at", { ascending: false })
  if (error) throw error

  return (data ?? []).map((row) => ({
    id: row.id,
    createdAt: row.created_at,
    name: row.name,
    quote: row.quote,
    status: row.status,
  }))
}

export async function submitTestimonial(params: { name: string; quote: string }) {
  const { error } = await supabase.from("testimonials").insert({
    name: params.name,
    quote: params.quote,
    status: "Pending Approval",
  })
  if (error) throw error
}
