import { Link } from "react-router-dom"
import { Droplets, Leaf, Sparkles, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ProductCard } from "@/components/ProductCard"
import { FloatingLeaves } from "@/components/decor/FloatingLeaves"
import { products } from "@/data/products"

const impactCards = [
  {
    icon: Users,
    title: "Supports Women Artisans",
    text: "Every purchase creates fair, dignified income for rural women artisan communities.",
    image: "/images/impact/women-artisans.jpg",
  },
  {
    icon: Droplets,
    title: "Reduces Water Hyacinth Waste",
    text: "We repurpose an invasive aquatic plant, easing pressure on lakes, ponds, and rivers.",
    image: "/images/impact/water-waste.jpg",
  },
  {
    icon: Sparkles,
    title: "Promotes Conscious Consumption",
    text: "Handmade, biodegradable pieces designed to replace mass-produced, plastic alternatives.",
    image: "/images/impact/conscious-consumption.jpg",
  },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/site/hero.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-teal/85 via-deep-teal/60 to-off-white" />
        </div>
        <FloatingLeaves />
        <div className="container-app relative flex flex-col items-center gap-8 py-28 text-center md:py-40">
          <span className="rounded-full border border-aqua/30 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-widest text-aqua uppercase backdrop-blur-sm">
            Sustainable · Handmade · Women-led
          </span>
          <h1 className="max-w-3xl text-balance font-serif text-4xl leading-tight text-off-white md:text-6xl">
            Handcrafted from Water Hyacinth. Made with Purpose.
          </h1>
          <p className="max-w-xl text-balance text-base leading-relaxed text-off-white/80 md:text-lg">
            Aqua Loops connects sustainable handmade products by women artisans
            directly to conscious consumers.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link to="/shop">Shop Collection</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-off-white/40 text-off-white hover:bg-white/10 hover:text-off-white"
              asChild
            >
              <Link to="/about">Our Impact</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* From Invasive Plant to Sustainable Craft */}
      <section className="container-app py-24 md:py-32">
        <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-sea">
              Our Origin
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-deep-teal md:text-4xl">
              From Invasive Plant to Sustainable Craft
            </h2>
            <p className="mt-5 text-base leading-relaxed text-ink/65">
              Water hyacinth is a fast-spreading aquatic plant that chokes
              lakes, ponds, and rivers — disrupting fishing, irrigation, and
              aquatic ecosystems across many regions. Aqua Loops works
              directly with rural women artisans to harvest, dry, and hand
              weave this invasive plant into beautiful, lasting lifestyle
              products — turning an ecological problem into a livelihood
              opportunity.
            </p>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
            <img
              src="/images/site/origin.jpg"
              alt="Hand-woven water hyacinth basket"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Impact cards */}
      <section className="bg-sand/30 py-24 md:py-28">
        <div className="container-app">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {impactCards.map(({ icon: Icon, title, text, image }) => (
              <Card
                key={title}
                className="overflow-hidden text-center transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="flex flex-col items-center gap-4 pt-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sea/10 text-sea">
                    <Icon className="size-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-lg text-deep-teal">{title}</h3>
                  <p className="text-sm leading-relaxed text-ink/60">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured collection */}
      <section className="container-app py-24 md:py-32">
        <div className="mb-14 flex flex-col items-center gap-3 text-center">
          <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-sea">
            <Leaf className="size-3.5" /> Featured Collection
          </p>
          <h2 className="font-serif text-3xl text-deep-teal md:text-4xl">
            A Glimpse of the Collection
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-14 flex justify-center">
          <Button size="lg" variant="outline" asChild>
            <Link to="/shop">View Full Collection</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
