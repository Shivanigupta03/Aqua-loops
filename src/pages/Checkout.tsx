import { useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { Link, Navigate } from "react-router-dom"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useCart } from "@/context/CartContext"
import { products } from "@/data/products"
import { createOrderId, saveOrder } from "@/lib/orders"
import { formatPrice } from "@/lib/utils"
import type { CustomerDetails, Order, OrderItem } from "@/types"

const UPI_ID = "9618772622@pthdfc"
const PAYEE_NAME = "NR Travelbuddyz LLP"

const BANK_DETAILS = {
  accountName: "NR TRAVELBUDDYZ LLP",
  bank: "YES BANK",
  accountNumber: "041363400010370",
  ifsc: "YESB0000413",
  branch: "RP Road Branch",
  accountType: "Current Account",
}

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
  const { items, subtotal, gst, courier, total, clearCart } = useCart()
  const [form, setForm] = useState<CustomerDetails>(emptyForm)
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerDetails, string>>>({})
  const [screenshotUrl, setScreenshotUrl] = useState("")
  const [screenshotError, setScreenshotError] = useState<string>()
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string>()

  const lines = useMemo(
    () =>
      items
        .map((item) => ({ item, product: products.find((p) => p.id === item.productId) }))
        .filter((l) => l.product),
    [items]
  )

  const upiLink = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(PAYEE_NAME)}&am=${total}&cu=INR&tn=Aqua%20Loops%20Order`

  if (items.length === 0 && !confirmedOrder) {
    return <Navigate to="/shop" replace />
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleScreenshotUrlChange(e: ChangeEvent<HTMLInputElement>) {
    setScreenshotUrl(e.target.value)
    setScreenshotError(undefined)
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

    let screenshotValid = true
    if (screenshotUrl.trim() && !/^https?:\/\/\S+$/.test(screenshotUrl.trim())) {
      setScreenshotError("Enter a valid link (starting with http:// or https://).")
      screenshotValid = false
    }

    return Object.keys(nextErrors).length === 0 && screenshotValid
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    setSubmitError(undefined)

    try {
      const orderItems: OrderItem[] = lines.map(({ item, product }) => ({
        productId: item.productId,
        name: product!.name,
        price: product!.price,
        quantity: item.quantity,
      }))

      const order = await saveOrder({
        id: createOrderId(),
        customer: form,
        items: orderItems,
        subtotal,
        gst,
        courier,
        total,
        screenshotUrl: screenshotUrl.trim() || undefined,
        createdAt: new Date().toISOString(),
      })

      setConfirmedOrder(order)
      clearCart()
    } catch {
      setSubmitError("Something went wrong submitting your order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
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
              share your payment screenshot for order confirmation.
            </p>

            <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-center">
              <div className="h-72 w-72 shrink-0 overflow-hidden rounded-2xl border border-sea/15 bg-white">
                <img
                  src="/images/payment-qr-cropped.png"
                  alt="UPI QR code for NR Travelbuddyz LLP"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium uppercase tracking-wide text-deep-teal/60">Payee</p>
                <p className="mt-1 font-serif text-lg text-deep-teal">{PAYEE_NAME}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-deep-teal/60">UPI ID</p>
                <p className="mt-1 font-serif text-lg text-deep-teal">{UPI_ID}</p>
                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-deep-teal/60">Amount</p>
                <p className="mt-1 font-serif text-lg text-deep-teal">{formatPrice(total)}</p>
                <Button asChild size="sm" className="mt-4">
                  <a href={upiLink}>Pay with GPay / UPI</a>
                </Button>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-sea/15 bg-aqua-pale/40 p-5">
              <p className="text-xs font-medium uppercase tracking-wide text-deep-teal/60">
                Or pay via Bank Transfer
              </p>
              <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
                <div className="flex justify-between gap-2 sm:block">
                  <dt className="text-ink/50">Account Name</dt>
                  <dd className="font-medium text-ink">{BANK_DETAILS.accountName}</dd>
                </div>
                <div className="flex justify-between gap-2 sm:block">
                  <dt className="text-ink/50">Bank</dt>
                  <dd className="font-medium text-ink">{BANK_DETAILS.bank}</dd>
                </div>
                <div className="flex justify-between gap-2 sm:block">
                  <dt className="text-ink/50">Account Number</dt>
                  <dd className="font-medium text-ink">{BANK_DETAILS.accountNumber}</dd>
                </div>
                <div className="flex justify-between gap-2 sm:block">
                  <dt className="text-ink/50">IFSC</dt>
                  <dd className="font-medium text-ink">{BANK_DETAILS.ifsc}</dd>
                </div>
                <div className="flex justify-between gap-2 sm:block">
                  <dt className="text-ink/50">Branch</dt>
                  <dd className="font-medium text-ink">{BANK_DETAILS.branch}</dd>
                </div>
                <div className="flex justify-between gap-2 sm:block">
                  <dt className="text-ink/50">Account Type</dt>
                  <dd className="font-medium text-ink">{BANK_DETAILS.accountType}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-6">
              <Label htmlFor="screenshot">Payment Screenshot Link</Label>
              <p className="mt-1 text-xs leading-relaxed text-ink/50">
                Upload your screenshot to Google Drive, set sharing to
                "Anyone with the link" → Viewer, then paste the link here.
              </p>
              <Input
                id="screenshot"
                type="url"
                inputMode="url"
                placeholder="https://drive.google.com/file/d/..."
                value={screenshotUrl}
                onChange={handleScreenshotUrlChange}
                className="mt-2"
              />
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
          <div className="mt-5 flex flex-col gap-2 border-t border-sea/10 pt-4 text-sm text-ink/60">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>GST (5%)</span>
              <span>{formatPrice(gst)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Courier</span>
              <span>{formatPrice(courier)}</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-sea/10 pt-4">
            <span className="font-serif text-lg text-deep-teal">Total</span>
            <span className="font-serif text-2xl text-deep-teal">{formatPrice(total)}</span>
          </div>
          {submitError && (
            <p className="mt-4 text-center text-sm text-red-500">{submitError}</p>
          )}
          <Button type="submit" size="lg" className="mt-6 w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting…" : "Submit Order Request"}
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
