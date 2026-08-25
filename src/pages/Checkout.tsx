import { useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { Link, Navigate } from "react-router-dom"
import { CheckCircle2, QrCode, UploadCloud } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useCart } from "@/context/CartContext"
import { products } from "@/data/products"
import { saveOrder } from "@/lib/orders"
import { formatPrice } from "@/lib/utils"
import type { CustomerDetails, Order, OrderItem } from "@/types"

const UPI_ID = "your-upi-id@bank"

const emptyForm: CustomerDetails = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
}

const requiredFields: (keyof CustomerDetails)[] = [
  "fullName",
  "email",
  "phone",
  "address",
  "city",
  "state",
  "pincode",
]

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart()
  const [form, setForm] = useState<CustomerDetails>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({})
  const [screenshotName, setScreenshotName] = useState<string>()
  const [screenshotDataUrl, setScreenshotDataUrl] = useState<string>()
  const [screenshotError, setScreenshotError] = useState<string>()
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null)

  const lines = useMemo(
    () =>
      items
        .map((item) => ({ item, product: products.find((p) => p.id === item.productId) }))
        .filter((l) => l.product),
    [items]
  )

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=Aqua%20Loops&am=${subtotal}&cu=INR&tn=Aqua%20Loops%20Order`

  if (items.length === 0 && !confirmedOrder) {
    return <Navigate to="/shop" replace />
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      setScreenshotError("Please upload an image file (PNG, JPG, etc).")
      return
    }

    setScreenshotError(undefined)
    setScreenshotName(file.name)

    // Stored as a base64 data URL for the localStorage-backed order below.
    // Supabase target: upload `file` to the "payment-screenshots" storage
    // bucket and store the returned public URL on the order instead.
    const reader = new FileReader()
    reader.onload = () => setScreenshotDataUrl(reader.result as string)
    reader.readAsDataURL(file)
  }

  function validate() {
    const nextErrors: Partial<Record<keyof CustomerDetails, string>> = {}
    for (const field of requiredFields) {
      if (!form[field].trim()) nextErrors[field] = "This field is required."
    }
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address."
    }
    if (form.phone && !/^[0-9+\-\s]{7,15}$/.test(form.phone)) {
      nextErrors.phone = "Enter a valid phone number."
    }
    if (form.pincode && !/^[0-9]{4,8}$/.test(form.pincode)) {
      nextErrors.pincode = "Enter a valid pincode."
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    const orderItems: OrderItem[] = lines.map(({ item, product }) => ({
      productId: item.productId,
      name: product!.name,
      price: product!.price,
      quantity: item.quantity,
    }))

    // Currently persisted to localStorage — see src/lib/orders.ts for the
    // Supabase migration path (orders table + screenshot storage bucket).
    const order = saveOrder({
      customer: form,
      items: orderItems,
      total: subtotal,
      screenshotName,
      screenshotDataUrl,
      createdAt: new Date().toISOString(),
    })

    setConfirmedOrder(order)
    clearCart()
  }

  if (confirmedOrder) {
    return (
      <div className="container-app flex flex-col items-center gap-5 py-32 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-sea/10 text-sea">
          <CheckCircle2 className="size-8" strokeWidth={1.5} />
        </div>
        <h1 className="max-w-lg font-serif text-3xl text-deep-teal">
          Thank you for supporting Aqua Loops.
        </h1>
        <p className="max-w-lg text-ink/65">
          Your order request has been received. We will verify your payment
          screenshot and contact you shortly.
        </p>
        <div className="mt-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-700">
          Order {confirmedOrder.id} — Pending Verification
        </div>
        <Button size="lg" asChild className="mt-4">
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container-app py-16 md:py-24">
      <h1 className="font-serif text-4xl text-deep-teal">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="flex flex-col gap-8 lg:col-span-2">
          {/* Delivery details */}
          <Card className="p-6">
            <h2 className="font-serif text-xl text-deep-teal">Delivery Details</h2>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Field label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} error={errors.fullName} />
              <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
              <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} error={errors.phone} />
              <Field label="Pincode" name="pincode" value={form.pincode} onChange={handleChange} error={errors.pincode} />
              <div className="sm:col-span-2">
                <Field label="Delivery Address" name="address" value={form.address} onChange={handleChange} error={errors.address} />
              </div>
              <Field label="City" name="city" value={form.city} onChange={handleChange} error={errors.city} />
              <Field label="State" name="state" value={form.state} onChange={handleChange} error={errors.state} />
              <div className="sm:col-span-2">
                <Label htmlFor="notes">Order Notes (optional)</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  className="mt-1.5"
                  placeholder="Anything we should know about your order?"
                />
              </div>
            </div>
          </Card>

          {/* Payment */}
          <Card className="p-6">
            <h2 className="font-serif text-xl text-deep-teal">Pay using GPay / UPI</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">
              Please complete the payment using the UPI details below and
              upload your payment screenshot for order confirmation.
            </p>

            <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="flex h-40 w-40 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-sea/25 bg-aqua-pale text-center">
                <QrCode className="size-8 text-sea/50" strokeWidth={1.5} />
                <p className="px-3 text-xs font-medium text-sea/60">
                  UPI QR code will be added here
                </p>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-deep-teal/60">UPI ID</p>
                <p className="mt-1 font-serif text-lg text-deep-teal">{UPI_ID}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-deep-teal/60">Amount</p>
                <p className="mt-1 font-serif text-lg text-deep-teal">{formatPrice(subtotal)}</p>
                <Button asChild size="sm" className="mt-4">
                  <a href={upiLink}>Pay with GPay / UPI</a>
                </Button>
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="screenshot">Upload Payment Screenshot</Label>
              <label
                htmlFor="screenshot"
                className="mt-1.5 flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-dashed border-sea/25 bg-aqua-pale/40 px-6 py-8 text-center transition-colors hover:bg-aqua-pale/70"
              >
                <UploadCloud className="size-6 text-sea/60" strokeWidth={1.5} />
                <span className="text-sm text-ink/60">
                  {screenshotName ? screenshotName : "Click to upload a screenshot (PNG, JPG)"}
                </span>
                <input
                  id="screenshot"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
              {screenshotError && (
                <p className="mt-1.5 text-xs text-red-500">{screenshotError}</p>
              )}
            </div>
          </Card>
        </div>

        {/* Order summary */}
        <Card className="h-fit p-6">
          <h2 className="font-serif text-xl text-deep-teal">Order Summary</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {lines.map(({ item, product }) => (
              <li key={item.productId} className="flex items-center justify-between text-sm">
                <span className="text-ink/70">
                  {product!.name} <span className="text-ink/40">× {item.quantity}</span>
                </span>
                <span className="font-medium text-ink">
                  {formatPrice(product!.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center justify-between border-t border-sea/10 pt-4">
            <span className="font-serif text-lg text-deep-teal">Total</span>
            <span className="font-serif text-2xl text-deep-teal">{formatPrice(subtotal)}</span>
          </div>
          <Button type="submit" size="lg" className="mt-6 w-full">
            Submit Order Request
          </Button>
          <p className="mt-3 text-center text-xs text-ink/40">
            This is a manual payment flow. Your order will be marked
            "Pending Verification" until we confirm your payment.
          </p>
        </Card>
      </form>
    </div>
  )
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
}: {
  label: string
  name: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
  type?: string
}) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1.5"
      />
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}
