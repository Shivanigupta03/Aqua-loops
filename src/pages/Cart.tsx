import { Link } from "react-router-dom"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/context/CartContext"
import { products } from "@/data/products"
import { formatPrice } from "@/lib/utils"

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, subtotal, gst, courier, total } = useCart()

  const lines = items
    .map((item) => ({ item, product: products.find((p) => p.id === item.productId) }))
    .filter((l) => l.product)

  if (lines.length === 0) {
    return (
      <div className="container-app flex flex-col items-center gap-5 py-32 text-center">
        <ShoppingBag className="size-12 text-sea/30" strokeWidth={1.5} />
        <h1 className="font-serif text-3xl text-deep-teal">Your cart is empty</h1>
        <p className="text-ink/60">Discover handwoven pieces made with purpose.</p>
        <Button size="lg" asChild>
          <Link to="/shop">Shop Collection</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container-app py-16 md:py-24">
      <h1 className="font-serif text-4xl text-deep-teal">Your Cart</h1>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="flex flex-col gap-5 lg:col-span-2">
          {lines.map(({ item, product }) => (
            <Card key={item.productId} className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
              <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-aqua-pale">
                <img
                  src={product!.images[0].src}
                  alt={product!.name}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: product!.images[0].focus }}
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <p className="font-serif text-lg text-deep-teal">{product!.name}</p>
                <p className="text-sm text-ink/50">{product!.category}</p>
                <p className="mt-1 font-medium text-ink">{formatPrice(product!.price)}</p>
              </div>
              <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end">
                <div className="flex items-center gap-2 rounded-full border border-sea/20 px-1">
                  <button
                    className="flex h-8 w-8 items-center justify-center text-deep-teal"
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-5 text-center text-sm">{item.quantity}</span>
                  <button
                    className="flex h-8 w-8 items-center justify-center text-deep-teal"
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="flex items-center gap-1 text-xs font-medium text-ink/40 transition-colors hover:text-red-500"
                >
                  <Trash2 className="size-3.5" /> Remove
                </button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="h-fit p-6">
          <h2 className="font-serif text-xl text-deep-teal">Order Summary</h2>
          <div className="mt-5 flex items-center justify-between text-sm text-ink/60">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-ink/60">
            <span>GST (5%)</span>
            <span>{formatPrice(gst)}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm text-ink/60">
            <span>Courier</span>
            <span>{formatPrice(courier)}</span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-sea/10 pt-4">
            <span className="font-serif text-lg text-deep-teal">Total</span>
            <span className="font-serif text-2xl text-deep-teal">{formatPrice(total)}</span>
          </div>
          <Button size="lg" className="mt-6 w-full" asChild>
            <Link to="/checkout">Proceed to Checkout</Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}
