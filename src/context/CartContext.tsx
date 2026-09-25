import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { products } from "@/data/products"
import { calculateCourier, calculateGST } from "@/lib/pricing"
import type { CartItem } from "@/types"

const CART_KEY = "aqua-loops-cart"

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  subtotal: number
  gst: number
  courier: number
  total: number
  addToCart: (productId: string, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isDrawerOpen: boolean
  openDrawer: () => void
  closeDrawer: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? (JSON.parse(raw) as CartItem[]) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => readCart())
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
  }, [items])

  const addToCart = useCallback((productId: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === productId)
      if (existing) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { productId, quantity }]
    })
    setIsDrawerOpen(true)
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.productId !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.productId !== productId)
      }
      return prev.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    })
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  )

  const lines = useMemo(
    () =>
      items
        .map((item) => ({ product: products.find((p) => p.id === item.productId), quantity: item.quantity }))
        .filter((l): l is { product: (typeof products)[number]; quantity: number } => Boolean(l.product)),
    [items]
  )

  const subtotal = useMemo(
    () => lines.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0),
    [lines]
  )

  const gst = useMemo(() => calculateGST(subtotal), [subtotal])

  const courier = useMemo(() => calculateCourier(lines), [lines])

  const total = subtotal + gst + courier

  const value: CartContextValue = {
    items,
    itemCount,
    subtotal,
    gst,
    courier,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isDrawerOpen,
    openDrawer: () => setIsDrawerOpen(true),
    closeDrawer: () => setIsDrawerOpen(false),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within a CartProvider")
  return ctx
}
