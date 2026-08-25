import type { Product } from "@/types"

/**
 * Single source of truth for the catalogue. Edit this array to add,
 * remove, or update products — every page (Shop, Product Detail, Cart)
 * reads from here.
 */
export const products: Product[] = [
  {
    id: "woven-storage-basket",
    name: "Woven Storage Basket",
    price: 950,
    category: "Storage",
    description:
      "A sturdy handwoven basket made from dried water hyacinth, ideal for home organization.",
    fullDescription:
      "Handwoven by rural women artisans, this basket transforms dried water hyacinth fibre into a sturdy, elegant storage piece for your home. Each weave pattern is slightly unique, carrying the mark of the hands that made it.",
    material: "Dried water hyacinth",
    handmadeBy: "Women artisans",
    sustainabilityNote:
      "Made from invasive water hyacinth removed from local water bodies, helping restore aquatic ecosystems while creating fair income for artisan communities.",
    images: [
      { src: "/images/products/woven-storage-basket.jpg", focus: "50% 80%" },
      { src: "/images/products/woven-storage-basket-2.jpg" },
    ],
  },
  {
    id: "round-serving-tray",
    name: "Round Serving Tray",
    price: 1200,
    category: "Dining",
    description: "A natural handcrafted tray perfect for serving or styling.",
    fullDescription:
      "This round tray brings warmth to your table. Woven from sun-dried water hyacinth reeds, it doubles as a serving piece for gatherings and a styling accent for shelves and coffee tables.",
    material: "Dried water hyacinth",
    handmadeBy: "Women artisans",
    sustainabilityNote:
      "Every tray sold funds fair wages for the artisan who wove it, and diverts invasive plant waste from local rivers and lakes.",
    images: [
      { src: "/images/products/round-serving-tray.jpg", focus: "50% 82%" },
      { src: "/images/products/round-serving-tray-2.jpg" },
    ],
  },
  {
    id: "wine-bottle-holder",
    name: "Wine Bottle Holder",
    price: 750,
    category: "Dining",
    description: "A snug woven sleeve that turns any bottle into a gift-ready piece.",
    fullDescription:
      "Hand-coiled from water hyacinth fibre, this bottle holder adds a natural, textured touch to a bottle of wine, oil, or juice — equally at home on your table or wrapped up for someone else's.",
    material: "Dried water hyacinth",
    handmadeBy: "Women artisans",
    sustainabilityNote:
      "A reusable, biodegradable alternative to gift boxes and plastic wrap, made from plant fibre pulled out of choked waterways.",
    images: [
      { src: "/images/products/wine-bottle-holder.jpg" },
      { src: "/images/products/wine-bottle-holder-2.jpg" },
      { src: "/images/products/wine-bottle-holder-3.jpg" },
    ],
  },
  {
    id: "woven-tote-bag",
    name: "Woven Tote Bag",
    price: 1100,
    category: "Bags",
    description: "A roomy handwoven tote for the beach, the market, or every day.",
    fullDescription:
      "Woven from durable water hyacinth fibre, this tote holds its shape trip after trip. Sturdy handles and a generous base make it as at home on a market run as it is on a weekend away.",
    material: "Dried water hyacinth",
    handmadeBy: "Women artisans",
    sustainabilityNote:
      "A long-lasting, plastic-free swap for single-use shopping bags, handwoven from an invasive plant pulled from local lakes.",
    images: [
      { src: "/images/products/woven-tote-bag.jpg", focus: "50% 35%" },
      { src: "/images/products/woven-tote-bag-2.jpg" },
      { src: "/images/products/woven-tote-bag-3.jpg" },
    ],
  },
  {
    id: "mini-handbag",
    name: "Mini Handbag",
    price: 850,
    category: "Bags",
    description: "A compact handwoven handbag finished with a beaded tassel accent.",
    fullDescription:
      "A little statement piece — this mini handbag is tightly woven from water hyacinth fibre and finished with a hand-strung beaded tassel, made to carry the essentials with character.",
    material: "Dried water hyacinth",
    handmadeBy: "Women artisans",
    sustainabilityNote:
      "Every bag sold supports fair wages for the artisan who wove it and keeps invasive plant waste out of local waterways.",
    images: [
      { src: "/images/products/mini-handbag.jpg" },
      { src: "/images/products/mini-handbag-2.jpg" },
    ],
  },
  {
    id: "mini-accent-bowl",
    name: "Mini Accent Bowl",
    price: 650,
    category: "Décor",
    description: "A unique sustainable decorative bowl made using water hyacinth fibers.",
    fullDescription:
      "A sculptural little bowl shaped entirely from water hyacinth fibre using traditional hand-weaving techniques. Equally happy on a shelf as a decorative accent or on the table holding fruit.",
    material: "Dried water hyacinth",
    handmadeBy: "Women artisans",
    sustainabilityNote:
      "Combines natural material innovation with heritage craft, giving invasive plant waste a second life as lasting décor.",
    images: [
      { src: "/images/products/mini-accent-bowl.jpg", focus: "50% 85%" },
      { src: "/images/products/mini-accent-bowl-2.jpg" },
      { src: "/images/products/mini-accent-bowl-3.jpg" },
    ],
  },
  {
    id: "desk-pen-holder",
    name: "Desk Pen Holder",
    price: 550,
    category: "Storage",
    description: "A compact handwoven organizer for desks, shelves, or bedside use.",
    fullDescription:
      "Small in size, big on purpose. This open-weave pen holder keeps everyday essentials in order on your desk, shelf, or nightstand, handwoven from dried water hyacinth fibre.",
    material: "Dried water hyacinth",
    handmadeBy: "Women artisans",
    sustainabilityNote:
      "A low-waste alternative to plastic organizers, supporting circular, plant-based material use.",
    images: [
      { src: "/images/products/desk-pen-holder.jpg", focus: "50% 92%" },
      { src: "/images/products/desk-pen-holder-2.jpg", focus: "50% 95%" },
    ],
  },
  {
    id: "kitchen-utensil-holder",
    name: "Kitchen Utensil Holder",
    price: 700,
    category: "Dining",
    description: "A handled basket that keeps spoons, whisks, and tongs within reach.",
    fullDescription:
      "Woven with a built-in carry handle, this utensil holder keeps your everyday kitchen tools upright and within reach on the counter, or ready to move to the table for serving.",
    material: "Dried water hyacinth",
    handmadeBy: "Women artisans",
    sustainabilityNote:
      "A natural-fibre swap for plastic caddies, made from water hyacinth cleared from local lakes and ponds.",
    images: [
      { src: "/images/products/kitchen-utensil-holder.jpg" },
      { src: "/images/products/kitchen-utensil-holder-2.jpg" },
    ],
  },
  {
    id: "spoon-ladle-holder",
    name: "Spoon & Ladle Holder",
    price: 600,
    category: "Dining",
    description: "A tall, tightly woven basket sized for spoons, ladles, and tongs.",
    fullDescription:
      "A tightly coiled, tall basket that comfortably holds serving spoons, ladles, and tongs upright by the stove or on the table. Simple, sturdy, and made to last.",
    material: "Dried water hyacinth",
    handmadeBy: "Women artisans",
    sustainabilityNote:
      "Handwoven from invasive water hyacinth fibre, replacing plastic utensil crocks with a biodegradable alternative.",
    images: [{ src: "/images/products/spoon-ladle-holder.jpg", focus: "50% 40%" }],
  },
  {
    id: "tissue-box-holder",
    name: "Tissue Box Holder",
    price: 700,
    category: "Dining",
    description: "A handwoven sleeve that dresses up a plain tissue box.",
    fullDescription:
      "Slide a standard tissue box into this handwoven holder for an instant, natural upgrade to any table or counter — no more staring at a plain cardboard box.",
    material: "Dried water hyacinth",
    handmadeBy: "Women artisans",
    sustainabilityNote:
      "A reusable natural-fibre cover that cuts down on disposable packaging waste, woven from reclaimed water hyacinth.",
    images: [
      { src: "/images/products/tissue-box-holder.jpg", focus: "50% 80%" },
      { src: "/images/products/tissue-box-holder-2.jpg" },
    ],
  },
  {
    id: "large-planter-basket",
    name: "Large Planter Basket",
    price: 1400,
    category: "Décor",
    description: "A generously sized woven planter cover for statement plants.",
    fullDescription:
      "Sized for your largest leafy plants, this planter basket wraps a plain pot in warm, natural texture — a simple way to bring a room together.",
    material: "Dried water hyacinth",
    handmadeBy: "Women artisans",
    sustainabilityNote:
      "A plastic-free planter cover handwoven from invasive water hyacinth, supporting fair income for the artisan who made it.",
    images: [
      { src: "/images/products/large-planter-basket.jpg", focus: "50% 78%" },
      { src: "/images/products/large-planter-basket-2.jpg" },
    ],
  },
  {
    id: "cylindrical-planter",
    name: "Cylindrical Planter",
    price: 1300,
    category: "Décor",
    description: "A clean-lined cylindrical planter cover with a tight, even weave.",
    fullDescription:
      "A tight, even weave gives this cylindrical planter a cleaner, more tailored look than a typical basket — a versatile cover for pots on the floor, a console, or a coffee table.",
    material: "Dried water hyacinth",
    handmadeBy: "Women artisans",
    sustainabilityNote:
      "Handwoven from dried water hyacinth fibre, turning an invasive aquatic plant into lasting, plastic-free décor.",
    images: [
      { src: "/images/products/cylindrical-planter.jpg", focus: "50% 78%" },
      { src: "/images/products/cylindrical-planter-2.jpg" },
      { src: "/images/products/cylindrical-planter-3.jpg" },
    ],
  },
  {
    id: "lidded-storage-container",
    name: "Lidded Storage Container",
    price: 1250,
    category: "Storage",
    description: "A handwoven container with a fitted lid for tidy, covered storage.",
    fullDescription:
      "A round container with a fitted woven lid, perfect for keeping small essentials out of sight but within reach — on a vanity, a shelf, or a coffee table.",
    material: "Dried water hyacinth",
    handmadeBy: "Women artisans",
    sustainabilityNote:
      "A covered, reusable storage piece handwoven from invasive water hyacinth fibre in place of plastic bins.",
    images: [
      { src: "/images/products/lidded-storage-container.jpg", focus: "50% 80%" },
      { src: "/images/products/lidded-storage-container-2.jpg" },
    ],
  },
]

export const categories = ["All", "Storage", "Dining", "Décor", "Bags"] as const
