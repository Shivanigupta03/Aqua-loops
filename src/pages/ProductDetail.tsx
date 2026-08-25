import { useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { ChevronLeft, Leaf, Minus, Plus, Sparkles, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductGallery } from "@/components/ProductGallery"
import { useCart } from "@/context/CartContext"
import { products } from "@/data/products"
import { formatPrice } from "@/lib/utils"

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  if (!product) return <Navigate to="/shop" replace />

  return (
    <div className="container-app py-16 md:py-24">
      <Link
        to="/shop"
        className="mb-10 inline-flex items-center gap-1.5 text-sm font-medium text-sea transition-colors hover:text-deep-teal"
      >
        <ChevronLeft className="size-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
        <ProductGallery images={product.images} alt={product.name} />

        <div>
          <Badge variant="outline">{product.category}</Badge>
          <h1 className="mt-4 font-serif text-3xl text-deep-teal md:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 font-serif text-2xl text-sea">{formatPrice(product.price)}</p>

          <p className="mt-6 text-base leading-relaxed text-ink/65">
            {product.fullDescription}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 rounded-2xl bg-sand/30 p-5 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <Leaf className="mt-0.5 size-4 shrink-0 text-sea" strokeWidth={1.75} />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-deep-teal/60">Material</p>
                <p className="text-sm text-ink/75">{product.material}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="mt-0.5 size-4 shrink-0 text-sea" strokeWidth={1.75} />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-deep-teal/60">Handmade By</p>
                <p className="text-sm text-ink/75">{product.handmadeBy}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 sm:col-span-2">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-sea" strokeWidth={1.75} />
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-deep-teal/60">Sustainability Note</p>
                <p className="text-sm text-ink/75">{product.sustainabilityNote}</p>
              </div>
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3 rounded-full border border-sea/20 px-2 py-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-9 w-9 items-center justify-center text-deep-teal"
                aria-label="Decrease quantity"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-6 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-9 w-9 items-center justify-center text-deep-teal"
                aria-label="Increase quantity"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <Button size="lg" className="flex-1" onClick={() => addToCart(product.id, quantity)}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
