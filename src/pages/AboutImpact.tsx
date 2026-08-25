import { Droplets, Hammer, ShoppingBag, Sprout } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { WaterRipple } from "@/components/decor/WaterRipple"

const processSteps = [
  {
    icon: Droplets,
    step: "01",
    title: "Water hyacinth is collected",
    text: "Harvested from local lakes and ponds where it grows invasively.",
    image: "/images/process/collected.jpg",
  },
  {
    icon: Sprout,
    step: "02",
    title: "It is dried and prepared",
    text: "Stems are sun-dried and treated to become durable, weavable fibre.",
    image: "/images/process/dried.jpg",
  },
  {
    icon: Hammer,
    step: "03",
    title: "Artisans handcraft products",
    text: "Rural women artisans hand-weave each piece using traditional techniques.",
    image: "/images/process/handcrafted.jpg",
  },
  {
    icon: ShoppingBag,
    step: "04",
    title: "Products are sold directly to consumers",
    text: "Finished pieces reach conscious consumers, with fair value returned to artisans.",
    image: "/images/process/sold.jpg",
  },
]

// Editable placeholders — update as real figures become available.
const impactStats = [
  { value: "00+", label: "Artisans Supported" },
  { value: "00+", label: "Products Created" },
  { value: "00+", label: "kg Water Hyacinth Reused" },
  { value: "00+", label: "Customers Reached" },
]

const galleryImages = [
  "/images/site/gallery-1.jpg",
  "/images/site/gallery-2.jpg",
  "/images/site/gallery-3.jpg",
  "/images/site/gallery-4.jpg",
  "/images/site/gallery-5.jpg",
  "/images/site/gallery-6.jpg",
]

export default function AboutImpact() {
  return (
    <div>
      <section className="relative overflow-hidden py-24 text-center md:py-32">
        <WaterRipple />
        <div className="container-app relative">
          <p className="text-xs font-medium uppercase tracking-widest text-sea">
            Our Story
          </p>
          <h1 className="mt-3 font-serif text-4xl text-deep-teal md:text-5xl">
            About &amp; Impact
          </h1>
        </div>
      </section>

      {/* About Aqua Loops */}
      <section className="container-app py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl text-deep-teal">About Aqua Loops</h2>
          <p className="mt-5 text-base leading-relaxed text-ink/65">
            Aqua Loops is a student-led sustainability initiative that works
            to transform water hyacinth into handmade lifestyle products
            while creating income opportunities for rural women artisans.
          </p>
        </div>
      </section>

      {/* About the Founder */}
      <section className="bg-sand/30 py-20 md:py-28">
        <div className="container-app grid grid-cols-1 items-center gap-14 md:grid-cols-2">
          <div className="aspect-square w-full max-w-md overflow-hidden rounded-3xl shadow-card">
            <img
              src="/images/site/founder.jpg"
              alt="Founder of Aqua Loops"
              className="h-full w-full object-cover object-[50%_18%]"
            />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-widest text-sea">
              The Founder
            </p>
            <h2 className="mt-3 font-serif text-3xl text-deep-teal">About the Founder</h2>
            <p className="mt-5 text-base leading-relaxed text-ink/65">
              Our founder started Aqua Loops to combine environmental action,
              women's empowerment, and sustainable design — building a bridge
              between an ecological challenge and a meaningful, dignified
              livelihood for rural artisan communities.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-app py-20 md:py-28">
        <div className="mb-14 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-sea">
            How It's Made
          </p>
          <h2 className="mt-3 font-serif text-3xl text-deep-teal md:text-4xl">Our Process</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map(({ icon: Icon, step, title, text, image }) => (
            <Card
              key={step}
              className="overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-soft"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="flex flex-col gap-4 pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sea/10 text-sea">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </div>
                  <span className="font-serif text-2xl text-sea/30">{step}</span>
                </div>
                <h3 className="font-serif text-lg text-deep-teal">{title}</h3>
                <p className="text-sm leading-relaxed text-ink/60">{text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Impact numbers */}
      <section className="bg-deep-teal py-20 text-off-white md:py-24">
        <div className="container-app">
          <div className="mb-12 text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-aqua">
              By the Numbers
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Our Impact</h2>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {impactStats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-serif text-4xl text-aqua md:text-5xl">{value}</p>
                <p className="mt-2 text-sm text-off-white/60">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="container-app py-20 md:py-28">
        <div className="mb-14 text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-sea">
            In Pictures
          </p>
          <h2 className="mt-3 font-serif text-3xl text-deep-teal md:text-4xl">Gallery</h2>
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3">
          {galleryImages.map((src, i) => (
            <div
              key={src}
              className="group aspect-square overflow-hidden rounded-2xl shadow-card"
            >
              <img
                src={src}
                alt={`Aqua Loops in pictures ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
