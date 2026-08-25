import type { Product } from "@/types"

/**
 * Single source of truth for the catalogue. Edit this array to add,
 * remove, or update products — every page (Shop, Product Detail, Cart)
 * reads from here.
 */
export const products: Product[] = [
  {
    id: "water-hyacinth-basket",
    name: "Water Hyacinth Basket",
    price: 850,
    category: "Storage",
    description:
      "A handwoven basket made from dried water hyacinth, ideal for home organization.",
    fullDescription:
      "Handwoven by rural women artisans, this basket transforms dried water hyacinth fibre into a sturdy, elegant storage piece for your home. Each weave pattern is slightly unique, carrying the mark of the hands that made it.",
    material: "Dried water hyacinth",
    handmadeBy: "Women artisans",
    sustainabilityNote:
      "Made from invasive water hyacinth removed from local water bodies, helping restore aquatic ecosystems while creating fair income for artisan communities.",
    images: [
      "/images/products/water-hyacinth-basket.jpg",
      "/images/products/water-hyacinth-basket-2.jpg",
    ],
  },
  {
    id: "round-serving-tray",
    name: "Round Serving Tray",
    price: 1200,
    category: "Dining",
    description:
      "A natural handcrafted tray perfect for serving or styling.",
    fullDescription:
      "This round tray brings warmth to your table. Woven from sun-dried water hyacinth reeds, it doubles as a serving piece for gatherings and a styling accent for shelves and coffee tables.",
    material: "Dried water hyacinth",
    handmadeBy: "Women artisans",
    sustainabilityNote:
      "Every tray sold funds fair wages for the artisan who wove it, and diverts invasive plant waste from local rivers and lakes.",
    images: [
      "/images/products/round-serving-tray.jpg",
      "/images/products/round-serving-tray-2.jpg",
    ],
  },
  {
    id: "decorative-wall-piece",
    name: "Woven Accent Bowl",
    price: 1500,
    category: "Décor",
    description:
      "A unique sustainable decorative bowl made using water hyacinth fibers.",
    fullDescription:
      "A sculptural statement for any tabletop, this bowl is shaped entirely from water hyacinth fibre using traditional hand-weaving techniques passed down through generations of artisan families.",
    material: "Dried water hyacinth",
    handmadeBy: "Women artisans",
    sustainabilityNote:
      "Combines natural material innovation with heritage craft, giving invasive plant waste a second life as lasting décor.",
    images: [
      "/images/products/woven-accent-bowl.jpg",
      "/images/products/woven-accent-bowl-2.jpg",
    ],
  },
  {
    id: "mini-organizer",
    name: "Mini Organizer",
    price: 650,
    category: "Storage",
    description:
      "A compact handwoven organizer for desks, shelves, or bedside use.",
    fullDescription:
      "Small in size, big on purpose. This compact organizer keeps everyday essentials in order on your desk, shelf, or nightstand, handwoven from dried water hyacinth fibre.",
    material: "Dried water hyacinth",
    handmadeBy: "Women artisans",
    sustainabilityNote:
      "A low-waste alternative to plastic organizers, supporting circular, plant-based material use.",
    images: [
      "/images/products/mini-organizer.jpg",
      "/images/products/mini-organizer-2.jpg",
    ],
  },
  {
    id: "artisan-gift-set",
    name: "Artisan Gift Set",
    price: 2200,
    category: "Gifts",
    description:
      "A curated sustainable gift set featuring handmade water hyacinth products.",
    fullDescription:
      "A thoughtfully curated set of our handmade pieces, presented together as a meaningful gift. Each item carries the story of the artisan who made it and the water body it helped restore.",
    material: "Dried water hyacinth",
    handmadeBy: "Women artisans",
    sustainabilityNote:
      "Gifting this set directly supports multiple artisan households and multiplies the environmental impact of water hyacinth removal.",
    images: [
      "/images/products/artisan-gift-set.jpg",
      "/images/products/artisan-gift-set-2.jpg",
      "/images/products/artisan-gift-set-3.jpg",
    ],
  },
]

export const categories = ["All", "Storage", "Dining", "Décor", "Gifts"] as const
