import { useState } from "react"
import { ProductCard } from "@/components/ProductCard"
import { WaterRipple } from "@/components/decor/WaterRipple"
import { cn } from "@/lib/utils"
import { categories, products } from "@/data/products"

export default function Shop() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All")

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <div>
      <section className="relative overflow-hidden py-20 text-center md:py-28">
        <WaterRipple />
        <div className="container-app relative">
          <p className="text-xs font-medium uppercase tracking-widest text-sea">
            The Collection
          </p>
          <h1 className="mt-3 font-serif text-4xl text-deep-teal md:text-5xl">Shop</h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/60">
            Handwoven water hyacinth pieces, made by rural women artisans.
          </p>
        </div>
      </section>

      <section className="container-app pb-24 md:pb-32">
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium tracking-wide transition-all duration-300",
                activeCategory === category
                  ? "border-deep-teal bg-deep-teal text-off-white"
                  : "border-sea/20 text-deep-teal/70 hover:border-sea hover:text-deep-teal"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-ink/50">
            No products found in this category yet.
          </p>
        )}
      </section>
    </div>
  )
}
