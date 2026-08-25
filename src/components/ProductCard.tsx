import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProductGallery } from "@/components/ProductGallery"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@/types"

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart()

  return (
    <Card className="group flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft">
      <Link to={`/shop/${product.id}`} className="block p-4 pb-0">
        <ProductGallery
          images={product.images}
          alt={product.name}
          aspect="aspect-[4/5]"
          compact
          className="[&_img]:transition-transform [&_img]:duration-700 group-hover:[&_img]:scale-105"
        />
      </Link>
      <CardContent className="flex flex-1 flex-col gap-3 pt-4">
        <Badge variant="outline" className="w-fit">{product.category}</Badge>
        <div>
          <Link to={`/shop/${product.id}`}>
            <h3 className="font-serif text-lg text-deep-teal transition-colors hover:text-sea">
              {product.name}
            </h3>
          </Link>
          <p className="mt-1 text-sm leading-relaxed text-ink/60">
            {product.description}
          </p>
        </div>
        <p className="font-serif text-xl text-deep-teal">{formatPrice(product.price)}</p>
        <div className="mt-auto flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link to={`/shop/${product.id}`}>View Details</Link>
          </Button>
          <Button size="sm" className="flex-1" onClick={() => addToCart(product.id)}>
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
