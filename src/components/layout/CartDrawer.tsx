import { Link } from "react-router-dom"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { products } from "@/data/products"
import { formatPrice } from "@/lib/utils"

export function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeFromCart, subtotal } =
    useCart()

  const lines = items
    .map((item) => ({
      item,
      product: products.find((p) => p.id === item.productId),
    }))
    .filter((l) => l.product)

  return (
    <Sheet open={isDrawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <ShoppingBag className="size-10 text-sea/30" strokeWidth={1.5} />
              <p className="text-sm text-ink/50">Your cart is empty.</p>
              <Button variant="outline" size="sm" onClick={closeDrawer} asChild>
                <Link to="/shop">Browse the Shop</Link>
              </Button>
            </div>
          ) : (
            <ul className="flex flex-col gap-5">
              {lines.map(({ item, product }) => (
                <li key={item.productId} className="flex gap-4">
                  <div className="h-20 w-20 shrink-0 rounded-2xl bg-gradient-to-br from-aqua-pale to-sand/50" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-serif text-base text-deep-teal">
                        {product!.name}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-ink/30 transition-colors hover:text-red-500"
                        aria-label="Remove item"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 rounded-full border border-sea/20 px-1">
                        <button
                          className="flex h-7 w-7 items-center justify-center text-deep-teal"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-4 text-center text-sm">{item.quantity}</span>
                        <button
                          className="flex h-7 w-7 items-center justify-center text-deep-teal"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </div>
                      <p className="text-sm font-medium text-ink">
                        {formatPrice(product!.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-sea/10 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-ink/60">Subtotal</span>
              <span className="font-serif text-xl text-deep-teal">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Button asChild size="lg" onClick={closeDrawer}>
                <Link to="/checkout">Checkout</Link>
              </Button>
              <Button variant="outline" onClick={closeDrawer} asChild>
                <Link to="/cart">View Cart</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
